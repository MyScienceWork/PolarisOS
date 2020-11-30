// @flow

module.exports = {};
const _ = require('lodash');
const elasticsearch = require('elasticsearch');
const Errors = require('../exceptions/errors');
const config = require('../../config');
const ODM = require('../entities/crud/odm');
const Mapper = require('../entities/crud/mapper');

const User = require('../entities/user/user');
const UserModel = require('../entities/user/models/users');

const Role = require('../entities/role/role');
const RoleModel = require('../entities/role/models/roles');

const Config = require('../entities/config/config');
const ConfigModel = require('../entities/config/models/configs');

const Lang = require('../entities/lang/lang');
const LangModel = require('../entities/lang/models/langs');

const Form = require('../entities/form/form');
const FormModel = require('../entities/form/models/forms');

const Pipeline = require('../entities/pipeline/pipeline');
const PipelineModel = require('../entities/pipeline/models/pipelines');

const _Entity = require('../entities/entity/entity');
const EntityModel = require('../entities/entity/models/entities');

const PFunction = require('../entities/function/function');
const PFunctionModel = require('../entities/function/models/functions');

const Importer = require('../entities/importer/importer');
const ImporterModel = require('../entities/importer/models/importers');

const Exporter = require('../entities/exporter/exporter');
const ExporterModel = require('../entities/exporter/models/exporters');

const Connector = require('../entities/connector/connector');
const ConnectorModel = require('../entities/connector/models/connectors');

const Query = require('../entities/query/query');
const QueryModel = require('../entities/query/models/queries');

const Widget = require('../entities/widget/widget');
const WidgetModel = require('../entities/widget/models/widgets');

const Page = require('../entities/page/page');
const PageModel = require('../entities/page/models/pages');

const Template = require('../entities/template/template');
const TemplateModel = require('../entities/template/models/templates');

const Menu = require('../entities/menu/menu');
const MenuModel = require('../entities/menu/models/menus');

const Publication = require('../entities/publication/publication');
const PublicationModel = require('../entities/publication/models/publications');

const Identifier = require('../entities/identifier/identifier');
const IdentifierModel = require('../entities/identifier/models/identifiers');

const MSWPublication = require('../entities/mswpublication/mswpublication');
const MSWPublicationModel = require('../entities/mswpublication/models/mswpublications');

const MailTemplate = require('../entities/mail_template/mail_template');
const MailTemplateModel = require('../entities/mail_template/models/mail_templates');

const Chart = require('../entities/chart/chart');
const ChartModel = require('../entities/chart/models/charts');

const TrackingStats = require('../entities/tracking_stat/tracking_stat');
const TrackingStatsModel = require('../entities/tracking_stat/models/tracking_stats');

const SystemReport = require('../entities/system_report/system_report');
const SystemReportModel = require('../entities/system_report/models/system_reports');

const Workflow = require('../entities/workflow/workflow');
const WorkflowModel = require('../entities/workflow/models/workflows');

const Cache = require('../entities/cache/cache');
const CacheModel = require('../entities/cache/models/caches');

type ObjectList = {
    whitelist?: Set<string>,
    blacklist?: Set<string>
};

const es_client = new elasticsearch.Client(config.elasticsearch);

function get_hits(result: Object): Array<any> {
    if ('hits' in result) {
        return result.hits;
    }

    if ('result' in result && 'hits' in result.result) {
        return result.result.hits;
    }

    return [];
}

function get_aggs(result: Object): Array<any> {
    if ('aggs' in result) {
        return result.aggs;
    }

    if ('result' in result && 'aggs' in result.result) {
        return result.result.aggs;
    }

    return [];
}


function get_index(type: string): string {
    return `${config.elasticsearch.index_prefix}_${type}`;
}

function format_search_for_lang(body: Object, lang: string = 'EN'): Object {
    const default_object = {
        size: Math.min(20, body.size || 20),
        sort: [{ _id: 'desc' }],
    };

    if (!('where' in body)) {
        return default_object;
    }

    const where = body.where;
    const keys = Object.keys(where);

    if (keys.length === 0) {
        return default_object;
    }

    const key = keys[0];
    const val = where[key];

    if (typeof val !== 'string') {
        return default_object;
    }

    default_object.where = { $and: [
        { 'values.value': val.trim() },
        { lang },
    ] };

    return default_object;
}

function format_search(body: Object, model: Object): Object {
    let source = true;
    if ('projection' in body) {
        if (body.projection === false || body.projection === 'false') {
            source = false;
        } else if (body.projection instanceof Array
                && body.projection.length === 0) {
            source = false;
        } else {
            source = body.projection;
        }
    }


    const options = { source };
    if ('size' in body && !isNaN(parseInt(body.size, 10))) {
        options.size = body.size;
    }

    if ('from' in body && !isNaN(parseInt(body.from, 10))) {
        options.from = body.from;
    }

    const s = Mapper.transform_to_search(body, model.Mapping);
    const sort = Mapper.transform_to_sort(body, model.Mapping);
    const aggs = Mapper.transform_to_aggregation(body, model.Mapping);

    if (sort != null && sort.length > 0) {
        s.add_sort(sort);
    }

    if (aggs != null && Object.keys(aggs).length > 0) {
        s.add_aggregations(aggs);
    }

    if ('scroll' in body) {
        options.scroll = body.scroll;
    }

    if ('scroll_id' in body) {
        options.scroll_id = body.scroll_id;
    }

    if ('population' in body) {
        if (body.population instanceof String) {
            options.population = body.population.split(',')
                .map(p => p.trim()).filter(p => p != null && p !== '');
        } else if (body.population instanceof Array) {
            options.population = body.population.filter(p => p != null && p !== '');
        }
    }

    if ('search_after' in body) {
        options.search_after = body.search_after;
        delete options.scroll;
        delete options.scroll_id;
    } else if ('search_before' in body) {
        options.search_before = body.search_before;
        delete options.scroll;
        delete options.scroll_id;
    }

    return { search: s, options };
}

async function grab_entity_from_type(type: string, mode: string = 'model'): ?Object {
    const response = format_search({ where: { type } }, EntityModel);
    const result = await _Entity.search(get_index('entity'), 'entity', es_client,
        EntityModel, response.search, response.options);
    if (result.hits.length === 0) {
        return null;
    }

    if (mode === 'model') {
        const model_response = format_search({ where: { _id: result.hits[0].source.pipelines.map(p => p._id) } }, PipelineModel);
        const model_result = await Pipeline.search(get_index('pipeline'), 'pipeline'
                , es_client, PipelineModel, model_response.search, model_response.options);

        if (model_result.hits.length === 0) {
            return null;
        }

        const c_pipelines_data = result.hits[0].source.conditional_pipelines;
        let c_model_result;
        if (c_pipelines_data) {
            const keys_c_pipelines = Object.keys(c_pipelines_data);
            const ids_c_pipelines = keys_c_pipelines.map(key => c_pipelines_data[key].pipeline)
            const c_model_response = format_search(
                { where: { _id: _.flatten(ids_c_pipelines).map(p => p._id) } }, PipelineModel);
            c_model_result = await Pipeline.search(get_index('pipeline'), 'pipeline'
                , es_client, PipelineModel, c_model_response.search, c_model_response.options);
        }
        const pipelines = model_result.hits;
        const conditional_pipelines = c_model_result.hits;
        const model = await Pipeline.generate_model(get_index(type), type,
            es_client, pipelines, conditional_pipelines, c_pipelines_data);
        return model;
    } else if (mode === 'class') {
        return ODM;
    }
    return null;
}

async function get_model_from_type(type: string): ?Object {
    switch (type) {
    case 'config':
        return ConfigModel;
    case 'user':
        return UserModel;
    case 'role':
        return RoleModel;
    case 'lang':
        return LangModel;
    case 'form':
        return FormModel;
    case 'pipeline':
        return PipelineModel;
    case 'entity':
        return EntityModel;
    case 'function':
        return PFunctionModel;
    case 'importer':
        return ImporterModel;
    case 'exporter':
        return ExporterModel;
    case 'connector':
        return ConnectorModel;
    case 'query':
        return QueryModel;
    case 'widget':
        return WidgetModel;
    case 'template':
        return TemplateModel;
    case 'page':
        return PageModel;
    case 'menu':
        return MenuModel;
    case 'publication': {
        if (['uspc', 'msw'].indexOf(config.elasticsearch.index_prefix) !== -1) {
            return MSWPublicationModel;
        }
        return PublicationModel;
    }
    case 'identifier':
        return IdentifierModel;
    case 'mail_template':
        return MailTemplateModel;
    case 'chart':
        return ChartModel;
    case 'tracking_stat':
        return TrackingStatsModel;
    case 'system_report':
        return SystemReportModel;
    case 'workflow':
        return WorkflowModel;
    case 'cache':
        return CacheModel;
    default: {
        return grab_entity_from_type(type, 'model');
    }
    }
}

async function get_info_from_type(type: string, id: ?string): ?ODM {
    switch (type) {
    case 'config':
        return new Config(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'user':
        return new User(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'role':
        return new Role(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'lang':
        return new Lang(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'form':
        return new Form(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'pipeline':
        return new Pipeline(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'entity':
        return new _Entity(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'function':
        return new PFunction(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'importer':
        return new Importer(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'query':
        return new Query(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'exporter':
        return new Exporter(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'connector':
        return new Connector(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'widget':
        return new Widget(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'template':
        return new Template(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'menu':
        return new Menu(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'page':
        return new Page(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'identifier':
        return new Identifier(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'publication': {
        if (['uspc', 'msw'].indexOf(config.elasticsearch.index_prefix) !== -1) {
            return new MSWPublication(get_index(type), type, es_client, await get_model_from_type(type), id);
        }
        return new Publication(get_index(type), type, es_client, await get_model_from_type(type), id);
    }
    case 'mail_template':
        return new MailTemplate(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'chart':
        return new Chart(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'tracking_stat':
        return new TrackingStats(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'system_report':
        return new SystemReport(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'workflow':
        return new Workflow(get_index(type), type, es_client, await get_model_from_type(type), id);
    case 'cache':
        return new Cache(get_index(type), type, es_client, await get_model_from_type(type), id);
    default: {
        const CLS = await grab_entity_from_type(type, 'class');
        if (CLS == null) {
            return null;
        }
        return new CLS(get_index(type), type, es_client, await get_model_from_type(type), id);
    }
    }
}

async function create(info: Object, type: string): Promise<*> {
    const cls = await get_info_from_type(type);
    if (cls == null) {
        return null;
    }

    /* if ('_id' in info) {
        delete info._id;
    }*/

    const model = cls.model;
    const response = await cls.constructor.create(get_index(type), type, es_client,
       model, info);
    return response;
}

async function creates(items: Array<Object>, type: string): Promise<*> {
    const cls = await get_info_from_type(type);
    if (cls == null) {
        throw Errors.InvalidEntity;
    }

    const response = await cls.constructor.bulk_create(get_index(type), type, es_client, items);
    return response;
}

async function updates(items: Array<Object>, type: string): Promise<*> {
    const cls = await get_info_from_type(type);
    if (cls == null) {
        throw Errors.InvalidEntity;
    }

    const response = await cls.constructor.bulk_update(get_index(type), type, es_client, items);
    return response;
}

async function update(info: Object, type: string): Promise<*> {
    const cls = await get_info_from_type(type);
    if (cls == null) {
        return null;
    }

    const model = cls.model;

    const id = info._id;
    delete info._id;
    const response = await cls.constructor.update(get_index(type), type,
            es_client, model, info, id);
    return response;
}


async function count(type: string, body: Object): Promise<*> {
    if (type == null) {
        throw Errors.InvalidEntity;
    }

    const cls = await get_info_from_type(type);
    if (cls == null) {
        return { entity: type, count: 0 };
    }

    const s = Mapper.transform_to_search(body, cls.mapping);
    const counting = await cls.constructor.count(get_index(type), type,
        es_client, cls.model, s);
    return { entity: type, count: counting.count };
}

async function search_lang(body: Object, lang: string = 'EN'): Promise<*> {
    // TODO May not be satisfactory enough
    const label = Object.keys(body.where)[0];

    const cls_lang = await get_info_from_type('lang');
    if (cls_lang == null) {
        body.where[label] = '';
        return body;
    }

    const response_lang = format_search(format_search_for_lang(body, lang), cls_lang.model);
    const result_lang = await cls_lang.constructor.search(get_index('lang'), 'lang',
            es_client, cls_lang.model, response_lang.search, response_lang.options);

    const hits_lang = get_hits(result_lang);
    if (hits_lang.length === 0) {
        body.where[label] = '';
        return body;
    }
    const keys = hits_lang.map(h => h.source.key);

    body.where[label] = keys;
    return body;
}

async function search(type: string, body: Object,
    translatable: boolean = false, lang: string = 'EN'): Promise<*> {
    if (type == null) {
        throw Errors.InvalidEntity;
    }

    if (translatable && 'where' in body && Object.keys(body.where).length > 0) {
        body = await search_lang(body, lang);
    }

    const cls = await get_info_from_type(type);
    if (cls == null) {
        return { entity: type, result: {} };
    }

    const response = format_search(body, cls.model);
    //console.log("this is body : ", JSON.stringify(body));
    const result = await cls.constructor.search(get_index(type), type, es_client,
            cls.model, response.search, response.options);

    return { entity: type, result };
}

async function retrieve(id: string, type: string,
        projection: string = '', population: string = ''): Promise<*> {
    if (type == null) {
        return null;
    }

    const odm = await get_info_from_type(type, id);

    if (odm == null) {
        return null;
    }

    let _source = true;
    if (projection === '') {
        _source = true;
    } else if (projection === 'false' || projection === false) {
        _source = false;
    } else {
        _source = projection.split(',').map(p => p.trim());
        if (_source === '') {
            _source = true;
        }
    }

    const _population = population.split(',')
        .map(p => p.trim()).filter(p => p != null && p !== '');

    if (_source === true) {
        const info = await odm.read({ population: _population });
        if (info.db.found) {
            return info;
        }
        return null;
    }

    const info = await odm.read({ source: _source, population: _population });
    if (info.db.found) {
        return info;
    }
    return null;
}

async function remove(id: string, type: string): Promise<*> {
    if (type == null) {
        return [null, null];
    }

    const odm = await get_info_from_type(type);
    if (odm == null) {
        return [null, null];
    }

    const obj = await odm.constructor.remove(get_index(type), type, es_client, id);
    return [odm, obj];
}

async function retrieve_and_get_source(type: string, id: string): ?Object {
    if (!id) {
        return null;
    }
    const search_results = await search(type, {
        size: 1,
        where: { _id: id },
    });

    const hits = get_hits(search_results);
    if (hits.length === 0) {
        return null;
    }
    return hits[0].source;
}

async function search_and_get_sources(type: string, body: Object): Array<Object> {
    const search_results = await search(type, body);
    const hits = get_hits(search_results);
    if (hits.length === 0) {
        return [];
    }
    return hits.map(h => h.source);
}

async function search_in_order_and_get_sources(type: string, body: Object, cb: Function) {
    body.sort = [{ _id: 'asc' }];
    let sources = await search_and_get_sources(type, body);
    cb(sources);
    while (sources.length > 0) {
        const b = _.merge({}, body, { search_after: [`${type}#${sources[sources.length - 1]._id}`] });
        sources = await search_and_get_sources(type, b);
        cb(sources);
    }
}

module.exports.retrieve = retrieve;
module.exports.get_info_from_type = get_info_from_type;
module.exports.get_model_from_type = get_model_from_type;
module.exports.create = create;
module.exports.creates = creates;
module.exports.update = update;
module.exports.updates = updates;
module.exports.count = count;
module.exports.search = search;
module.exports.remove = remove;
module.exports.format_search = format_search;
module.exports.get_index = get_index;
module.exports.get_hits = get_hits;
module.exports.get_aggs = get_aggs;
module.exports.retrieve_and_get_source = retrieve_and_get_source;
module.exports.search_and_get_sources = search_and_get_sources;
module.exports.search_in_order_and_get_sources = search_in_order_and_get_sources;
