// @flow
const elasticsearch = require('elasticsearch');
const Errors = require('../exceptions/errors');
const config = require('../../config');
const ODM = require('../entities/crud/odm');
const Mapper = require('../entities/crud/mapper');

const Publication = require('../entities/publication/publication');
const PublicationModel = require('../entities/publication/models/publications');

const Citation = require('../entities/citation/citation');
const CitationModel = require('../entities/citation/models/citations');

const User = require('../entities/user/user');
const UserModel = require('../entities/user/models/users');

const Config = require('../entities/config/config');
const ConfigModel = require('../entities/config/models/configs');

const Lang = require('../entities/lang/lang');
const LangModel = require('../entities/lang/models/langs');

const DataTemplate = require('../entities/datatemplate/datatemplate');
const DataTemplateModel = require('../entities/datatemplate/models/datatemplates');

const Form = require('../entities/form/form');
const FormModel = require('../entities/form/models/forms');

const Typology = require('../entities/typology/typology');
const TypologyModel = require('../entities/typology/models/typologies');

type ObjectList = {
    whitelist?: Set<string>,
    blacklist?: Set<string>
};

const es_client = new elasticsearch.Client(config.elasticsearch);

function get_model_from_type(type: string): ?Object {
    switch (type) {
    case 'publication':
        return PublicationModel;
    case 'citation':
        return CitationModel;
    case 'user':
        return UserModel;
    case 'config':
        return ConfigModel;
    case 'lang':
        return LangModel;
    case 'datatemplate':
        return DataTemplateModel;
    case 'form':
        return FormModel;
    case 'typology':
        return TypologyModel;
    default:
        return null;
    }
}

function get_cls_from_type(type: string): ?Object {
    switch (type) {
    case 'publication':
        return Publication;
    case 'citation':
        return Citation;
    case 'user':
        return User;
    case 'config':
        return Config;
    case 'lang':
        return Lang;
    case 'datatemplate':
        return DataTemplate;
    case 'form':
        return Form;
    case 'typology':
        return Typology;
    default:
        return null;
    }
}

function get_info_from_type(type: string, id: ?string): ?ODM {
    switch (type) {
    case 'publication':
        return new Publication(es_client, id);
    case 'citation':
        return new Citation(es_client, id);
    case 'config':
        return new Config(es_client, id);
    case 'user':
        return new User(es_client, id);
    case 'lang':
        return new Lang(es_client, id);
    case 'datatemplate':
        return new DataTemplate(es_client, id);
    case 'form':
        return new Form(es_client, id);
    case 'typology':
        return new Typology(es_client, id);
    default:
        return null;
    }
}

async function create(info: Object, type: string): Promise<*> {
    const cls = get_cls_from_type(type);
    if (cls == null) {
        return null;
    }

    const response = await cls.create(es_client, info);
    console.log('create', response);
    return response;
}

async function update(info: Object, type: string): Promise<*> {
    const cls = get_cls_from_type(type);
    if (cls == null) {
        return null;
    }

    const id = info._id;
    delete info._id;
    const response = await cls.update(es_client, info, id);
    return response;
}


async function count(type: string, body: Object): Promise<*> {
    if (type == null) {
        throw Errors.InvalidEntity;
    }

    const cls = get_cls_from_type(type);
    if (cls == null) {
        return { entity: type, count: 0 };
    }

    const s = Mapper.transform_to_search(body, cls.mapping());
    const counting = await cls.count(es_client, s);
    return { entity: type, count: counting.count };
}

async function search(type: string, body: Object): Promise<*> {
    if (type == null) {
        throw Errors.InvalidEntity;
    }

    const cls = get_cls_from_type(type);
    if (cls == null) {
        return { entity: type, result: {} };
    }

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

    const s = Mapper.transform_to_search(body, cls.mapping());
    const sort = Mapper.transform_to_sort(body, cls.mapping());
    const aggs = Mapper.transform_to_aggregation(body, cls.mapping());

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

    const result = await cls.search(es_client, s, options);
    return { entity: type, result };
}

async function retrieve(id: string, type: string,
        projection: string = ''): Promise<*> {
    if (type == null) {
        return null;
    }

    const odm = get_info_from_type(type, id);

    if (odm == null) {
        return null;
    }

    let _source = true;
    if (projection === '') {
        _source = true;
    } else if (projection === 'false' || projection === false) {
        _source = false;
    } else {
        _source = projection.split(',');
    }

    if (_source === true) {
        return odm.read();
    }
    return odm.read({ source: _source });
}

async function remove(id: string, type: string): Promise<*> {
    if (type == null) {
        return [null, null];
    }

    const odm = get_info_from_type(type);
    if (odm == null) {
        return [null, null];
    }

    const cls = get_cls_from_type(type);
    if (cls == null) {
        return [null, null];
    }

    const obj = await cls.remove(es_client, id);
    return [odm, obj];
}

exports.retrieve = retrieve;
exports.get_info_from_type = get_info_from_type;
exports.get_model_from_type = get_model_from_type;
exports.create = create;
exports.update = update;
exports.count = count;
exports.search = search;
exports.remove = remove;
