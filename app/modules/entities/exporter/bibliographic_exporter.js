// @flow
const Readable = require('stream').Readable;
const _ = require('lodash');
const HtmlDocx = require('html-docx-js');
const Cite = require('citation-js');
const EntitiesUtils = require('../../utils/entities');
const LangUtils = require('../../utils/lang');
const Utils = require('../../utils/utils');
const URLUtils = require('../../utils/url');
const CSLUtils = require('../../utils/csl');
const CSLJSONPipeline = require('./pipeline/csl_pipeline');
const Errors = require('../../exceptions/errors');
const ExtraCSLStyles = require('../../../csl_styles/register');
const Logger = require ('../../../logger.js');

ExtraCSLStyles.add_styles(Cite, ExtraCSLStyles.styles);

class BibliographicExporter {
    _csl_style: string;
    _lang: string;
    _options: Object;
    _extra: Object;
    _max_size: number;

    constructor(csl_style: string, lang: string = 'EN', extra: Object, options: Object = {}) {
        this._options = options;
        this._extra = extra;
        this._csl_style = csl_style;
        this._lang = lang;
        this._max_size = 1000;
    }

    get filetype(): string {
        return this._options.export_type[0];
    }

    async _generate_default_options() {
        const empty_arrays = ['types', 'subtypes', 'projects', 'authors',
            'labs', 'collections', 'labs', 'collections', 'sort',
            'group', 'start_year', 'end_year'];

        this._options = empty_arrays.reduce((obj, a) => {
            obj[a] = obj[a] || [];
            return obj;
        }, this._options);

        this._options.size = this._options.size || [1000];
        this._options.size = [Math.max(this._max_size, parseInt(this._options.size[0], 10))];

        this._options.export_type = this._options.export_type || ['.html'];
    }

    async _validate_options(): Promise<boolean> {
        const { types, subtypes, projects, authors,
            labs, sort } = this._options;

        if (projects.length === 0 && authors.length === 0 && labs.length === 0) {
            const e = Errors.InvalidEntity;
            e.message = 'l_err_no_project_author_lab_bexport';
            throw e;
        }

        if (types.length === 0 && subtypes.length === 0) {
            const e = Errors.InvalidEntity;
            e.message = 'l_err_no_typology_bexport';
            throw e;
        }

        if (sort.length === 0) {
            const e = Errors.InvalidEntity;
            e.message = 'l_err_no_sort_bexport';
            throw e;
        }

        return true;
    }

    _generate_agg_year(size: any, sort: any): Object {
        return {
            'dates.publication': {
                $name: 'dates.publication',
                $type: 'date_histogram',
                interval: 'year',
                format: 'YYYY',
                keyed: true,
                min_doc_count: 1,
                order: { _time: 'desc' }, // Deprecated in ES 6.x TODO
                $aggregations: {
                    dummy_field: {
                        $name: 'publications',
                        $type: 'top_hits',
                        size: Math.round(size[0] / 10), // Estimate no more than 10y
                        sort,
                    },
                },
            },
        };
    }

    _generate_agg_type_subtype(size: any, sort: any): Object {
        return {
            type: {
                $name: 'type',
                $type: 'terms',
                keyed: true,
                min_doc_count: 1,
                order: { _term: 'asc' },
                $aggregations: {
                    subtype: {
                        $name: 'subtype',
                        $type: 'terms',
                        keyed: true,
                        min_doc_count: 1,
                        missing: 'UNDEFINED',
                        $aggregations: {
                            dummy_field: {
                                $name: 'publications',
                                $type: 'top_hits',
                                size: Math.round(size[0]),
                                sort,
                            },
                        },
                    },
                },
            },
        };
    }

    _generate_agg_all(size: any, sort: any): Object {
        const agg_year = this._generate_agg_year(size, sort);
        agg_year['dates.publication'].$name = 'year_type';
        agg_year['dates.publication'].$aggregations = this._generate_agg_type_subtype(size, sort);
        return agg_year;
    }

    async _fetch_typology() {
        const typologies = await EntitiesUtils.search_and_get_sources('typology', {
            size: 100,
            where: {},
        });

        // Get and translate parents
        const parent_keys = typologies.map(typology => typology.label);

        let lang_items = await LangUtils
            .get_language_values_from_langs_and_keys(parent_keys, [this._lang]);

        const typology_parents = typologies.reduce((obj, typology) => {
            const it = lang_items[this._lang][typology.label] || typology.label;
            typology.label = it;
            obj[typology._id] = typology;
            return obj;
        }, {});

        // Get and translate children
        const children = _.flatten(typologies.map(type => type.children));
        const children_lang_keys = children.map(child => child.label);
        lang_items = await LangUtils
            .get_language_values_from_langs_and_keys(children_lang_keys, [this._lang]);


        const typology_children = children.reduce((obj, child) => {
            const it = lang_items[this._lang][child.label] || child.label;
            child.label = it;
            obj[child.name] = child;
            return obj;
        }, {});

        return { parents: typology_parents, children: typology_children };
    }

    async _process_year_aggregations(root_key: string,
        buckets: Array<Object>): Promise<Array<Object>> {
        const publications = buckets.map((bucket) => {
            const key = bucket.key_as_string || bucket.key;
            const pubs = Utils.find_value_with_path(bucket,
                'publications.hits.hits'.split('.')) || [];
            return { key,
                publications: pubs.map((p) => {
                    p._source._id = p._id;
                    return { source: p._source };
                }) };
        });
        return publications;
    }

    async _process_type_aggregations(root_key: string,
        buckets: Array<Object>): Promise<Array<Object>> {
        const { parents, children } = await this._fetch_typology();
        const publications = buckets.map((bucket) => {
            const pid = bucket.key_as_string || bucket.key;
            const publications_per_type = {
                key: parents[pid].label || pid,
                order_view: parents[pid].order_view || '0',
                subtypes: bucket.subtype.buckets.map((subbucket) => {
                    const subkey = subbucket.key_as_string || subbucket.key;
                    const pubs = Utils.find_value_with_path(subbucket, 'publications.hits.hits'.split('.')) || [];
                    return {
                        key: children[subkey] ? children[subkey].label : subkey,
                        order_view: children[subkey] ? children[subkey].order_view : '0',
                        publications: pubs.map((p) => {
                            p._source._id = p._id;
                            return { source: p._source };
                        }) };
                }),
            };
            publications_per_type.subtypes.sort((a, b) => a.order_view.localeCompare(b.order_view));
            return publications_per_type;
        });
        publications.sort((a, b) => a.order_view.localeCompare(b.order_view));
        return publications;
    }

    async _process_year_type_aggregations(root_key: string, buckets: Array<Object>): Promise<Array<Object>> {
        const infos = buckets.map(async (ybuckets) => {
            const obj = {
                key: ybuckets.key_as_string || ybuckets.key,
                types: await this._process_type_aggregations(root_key, ybuckets.type.buckets),
            };
            return obj;
        });
        return await Promise.all(infos);
    }

    async _generate_html_year(publications: Array<Object>): Promise<string> {
        let str = '';
        for (const infos of publications) {
            str += `<h2>${infos.key}</h2>`;
            str += await this.format_bibliography_results(infos.publications);
        }
        return str;
    }

    async _generate_html_subtype(publications: Array<Object>): Promise<string> {
        let str = '';
        for (const infos of publications) {
            str += `<h1 style='font-variant: small-caps;'>${infos.key}</h1>`;
            for (const subinfos of infos.subtypes) {
                if (subinfos.key !== 'UNDEFINED') {
                    str += `<h2>${subinfos.key}</h2>`;
                }
                str += await this.format_bibliography_results(subinfos.publications);
            }
        }
        return str;
    }

    async _generate_html_all(publications: Array<Object>): Promise<string> {
        let str = '';
        for (const infos of publications) {
            str += `<h1>${infos.key}</h1>`;
            for (const typeinfos of infos.types) {
                str += `<h2 style='font-variant: small-caps;'>${typeinfos.key}</h2>`;
                for (const subinfos of typeinfos.subtypes) {
                    if (subinfos.key !== 'UNDEFINED') {
                        str += `<h3>${subinfos.key}</h3>`;
                    }
                    str += await this.format_bibliography_results(subinfos.publications);
                }
            }
        }
        return str;
    }

    async generate_aggregations(): Promise<Object> {
        const { size, sort } = this._options;

        switch (this._options.group[0]) {
        default:
        case 'dates.publication':
            return this._generate_agg_year(size, sort);
        case 'subtype':
            return this._generate_agg_type_subtype(size, sort);
        case 'dates.publication+subtype':
            return this._generate_agg_all(size, sort);
        }
    }

    async generate_query(): Promise<Object> {
        const { authors, projects, labs, types,
            subtypes, collections, start_year, end_year } = this._options;

        const where = { $and: [] };

        if (authors.length > 0) {
            where.$and.push({ 'contributors.label': authors });
        }

        if (projects.length > 0) {
            where.$and.push({ 'diffusion.projects._id': projects });
        }

        if (labs.length > 0) {
            where.$and.push({ 'diffusion.research_teams._id': labs });
        }

        if (types.length > 0) {
            where.$and.push({ type: types });
        }

        if (subtypes.length > 0) {
            where.$and.push({ subtype: subtypes });
        }

        if (collections.length > 0) {
            where.$and.push({ 'diffusion.internal_collection': collections });
        }

        if (start_year.length > 0) {
            const range = { '>=': parseInt(start_year[0], 10) };

            if (end_year.length > 0) {
                range['<='] = parseInt(end_year[0], 10);
            }
            where.$and.push({ 'dates.publication': range });
        }
        return where;
    }

    async get_publications(): Promise<Object> {
        const pub_results = await EntitiesUtils.search('publication', {
            where: await this.generate_query(),
            size: 0,
            aggregations: await this.generate_aggregations(),
        });
        const aggs = EntitiesUtils.get_aggs(pub_results);
        return aggs;
    }

    async process_aggregations(aggs: Object): Promise<Array<Object>> {
        const root_key = Object.keys(aggs).length > 0 ? Object.keys(aggs)[0] : null;

        if (!root_key) {
            return [];
        }

        const buckets = aggs[root_key].buckets || [];

        if (buckets.length === 0) {
            return [];
        }

        if (root_key.indexOf('type') === -1) {
            return await this._process_year_aggregations(root_key, buckets);
        }

        if (root_key.indexOf('type') !== -1 && root_key.indexOf('year') !== -1) {
            return await this._process_year_type_aggregations(root_key, buckets);
        }
        return await this._process_type_aggregations(root_key, buckets);
    }

    async transform_to_csl_json(publications: Array<Object>): Promise<Array<Object>> {
        const results = [];
        const typologies = (await EntitiesUtils.search_and_get_sources('typology', {
            size: 1000,
        })).reduce((obj, t) => {
            obj[t._id] = t;
            return obj;
        }, {});

        for (const i in publications) {
            const publication = publications[i].source;
            let type = null;
            if (publication.subtype && publication.subtype in CSLJSONPipeline.types) {
                type = CSLJSONPipeline.types[publication.subtype];
            } else {
                const typology = typologies[publication.type];
                const name = typology.name;
                if (name in CSLJSONPipeline.types) {
                    type = CSLJSONPipeline.types[name];
                } else {
                    type = 'article';
                }
            }

            let obj = {};
            for (const key in CSLJSONPipeline.mapping) {
                const pub_info = Utils.find_value_with_path(publication, key.split('.'));
                if (!pub_info || (pub_info instanceof Array && pub_info.length === 0)) {
                    continue;
                }

                const info = CSLJSONPipeline.mapping[key];
                let mapper = null;
                if (type in info) {
                    mapper = info[type];
                } else if ('__default' in info) {
                    mapper = info.__default;
                }

                if (!mapper) {
                    continue;
                }

                let subobj = await mapper.picker(pub_info, publication, this._lang);
                if (mapper.transformers.length > 0) {
                    subobj = await mapper.transformers.reduce((o, tr) => {
                        o = tr(o);
                        return o;
                    }, subobj);
                }

                obj = _.mergeWith(obj, subobj, (objValue, srcValue) => {
                    if (_.isArray(objValue)) {
                        return objValue.concat(srcValue);
                    }
                });
            }
            obj.type = type;
            obj.id = publication._id;
            results.push(obj);
        }
        return results;
    }

    concat_all_authors(obj){
        let final = [];
        if (obj.author) {
            final = final.concat(obj.author[0].family.toLowerCase()+obj.author[0].given.toLowerCase());
        }
        if (obj.director) {
            final = final.concat(obj.director[0].family.toLowerCase()+obj.director[0].given.toLowerCase());
        }
        if (obj.editor) {
            final = final.concat(obj.editor[0].family.toLowerCase()+obj.editor[0].given.toLowerCase());
        }
        return final.sort();
    }

    async format_bibliography_results(publications: Array<Object>): Promise<string> {
        const csl_json_output = await this.transform_to_csl_json(publications);
        Logger.info(JSON.stringify(csl_json_output, null, 4));
        const data = new Cite(csl_json_output);
        data.sort((objA, objB) => {
            const authorsA = this.concat_all_authors(objA);
            const authorsB = this.concat_all_authors(objB);

            if (authorsA.length > 0 && authorsB.length > 0) {
                if( authorsA[0] > authorsB[0] ) {
                    return 1;
                }
                return -1;
            }
            return 0;
        });
        let results = data.get({
            nosort: true,
            format: 'string',
            type: 'html',
            style: `citation-${this._csl_style}`,
            lang: CSLUtils.langs_mapping[this._lang] || 'en-US',
        });
        results = URLUtils.transform_static_links_to_clickable_links_with_offset(results);
        return results;
    }

    generate_html(publications: Array<Object>): Promise<string> {
        switch (this._options.group[0]) {
        default:
        case 'dates.publication':
            return this._generate_html_year(publications);
        case 'subtype':
            return this._generate_html_subtype(publications);
        case 'dates.publication+subtype':
            return this._generate_html_all(publications);
        }
    }

    generate_file(html: string): any {
        if (this._options.export_type[0] === '.docx') {
            let results = `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head><body>${html}</body></html>`;
            results = HtmlDocx.asBlob(results);

            const s = new Readable();
            s.push(results);
            s.push(null);
            return s;
        }

        return `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" type="text/css" href="/public/front/biblio_css/biblio.css">
        </head><body>${html}</body></html>`;
    }

    async run(): Promise<any> {
        await this._generate_default_options();
        await this._validate_options();
        const aggs = await this.get_publications();
        const publications = await this.process_aggregations(aggs);
        const html = await this.generate_html(publications);
        const final = this.generate_file(html);
        return final;
    }
}

module.exports = BibliographicExporter;
