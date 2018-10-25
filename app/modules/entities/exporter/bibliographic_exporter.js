// @flow
const _ = require('lodash');
const EntitiesUtils = require('../../utils/entities');
const LangUtils = require('../../utils/lang');
const Utils = require('../../utils/utils');
const URLUtils = require('../../utils/url');
const CSLUtils = require('../../utils/csl');
const Errors = require('../../exceptions/errors');

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
        agg_year.$aggregations = this._generate_agg_type_subtype(size, sort);
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

    async _process_type_aggregations(root_key: string, buckets: Array<Object>): Promise<Array<Object>> {
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
        return [];
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

    async format_bibliography_results(publications: Array<Object>): Promise<string> {
        const csl_json_output = await transform_to_csl_json(publications, this._extra);
        const data = new Cite(csl_json_output);
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

    async generate_html(publications: Array<Object>): Promise<string> {
        // switch
        return '';
    }

    async run(): Promise<any> {
        await this._generate_default_options();
        await this._validate_options();
        const aggs = await this.get_publications();
        console.log(aggs);
        const publications = await this.process_aggregations(aggs);
        console.log(JSON.stringify(publications));
        const html = await this.generate_html(publications);
    }
}

module.exports = BibliographicExporter;
