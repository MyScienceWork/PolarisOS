// @flow

module.exports = {};

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

type ObjectList = {
    whitelist?: Set<string>,
    blacklist?: Set<string>
};

const es_client = new elasticsearch.Client(config.elasticsearch);

function get_index(type) {
    return `${config.elasticsearch.index_prefix}_${type}`;
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
    } else if ('search_before' in body) {
        options.search_before = body.search_before;
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
        const model_response = format_search({ where: { $$term: { _id: result.hits[0].source.pipeline } } }, PipelineModel);
        const model_result = await Pipeline.search(get_index('pipeline'), 'pipeline', es_client,
                PipelineModel, model_response.search, model_response.options);
        if (model_result.hits.length === 0) {
            return null;
        }
        const pipeline = model_result.hits[0];
        const model = await pipeline.generate_model(get_index(type), type);
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
    case 'widget':
        return WidgetModel;
    case 'template':
        return TemplateModel;
    case 'page':
        return PageModel;
    case 'menu':
        return MenuModel;
    case 'publication':
        return PublicationModel;
    default:
        return grab_entity_from_type(type, 'model');
        // return null;
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
    case 'publication':
        return new Publication(get_index(type), type, es_client, await get_model_from_type(type), id);
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
    const model = await get_model_from_type(type);
    if (cls == null) {
        return null;
    }

    const response = await cls.constructor.create(get_index(type), type, es_client,
       model, info);
    // console.log('create', response);
    return response;
}

async function update(info: Object, type: string): Promise<*> {
    const cls = await get_info_from_type(type);
    const model = await get_model_from_type(type);
    if (cls == null) {
        return null;
    }

    const id = info._id;
    delete info._id;
    const response = await cls.constructor.update(get_index(type), type,
            es_client, model, info, id);
    // console.log(response);
    return response;
}


async function count(type: string, body: Object): Promise<*> {
    if (type == null) {
        throw Errors.InvalidEntity;
    }

    const cls = await get_info_from_type(type);
    const model = await get_model_from_type(type);
    if (cls == null) {
        return { entity: type, count: 0 };
    }

    const s = Mapper.transform_to_search(body, cls.mapping);
    const counting = await cls.constructor.count(get_index(type), type,
        es_client, model, s);
    return { entity: type, count: counting.count };
}

async function search(type: string, body: Object): Promise<*> {
    if (type == null) {
        throw Errors.InvalidEntity;
    }

    const cls = await get_info_from_type(type);
    const model = await get_model_from_type(type);
    if (cls == null) {
        return { entity: type, result: {} };
    }

    const response = format_search(body, model);
    const result = await cls.constructor.search(get_index(type), type, es_client,
            model, response.search, response.options);
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

function get_hits(result) {
    if ('hits' in result) {
        return result.hits;
    }

    if ('result' in result && 'hits' in result.result) {
        return result.result.hits;
    }

    return [];
}

module.exports.retrieve = retrieve;
module.exports.get_info_from_type = get_info_from_type;
module.exports.get_model_from_type = get_model_from_type;
module.exports.create = create;
module.exports.update = update;
module.exports.count = count;
module.exports.search = search;
module.exports.remove = remove;
module.exports.format_search = format_search;
module.exports.get_index = get_index;
module.exports.get_hits = get_hits;
