// @flow
const ODM = require('../entities/crud/odm');

/**
 * Forge a standard response when returning HTTP 200 for any request
 * @param model - Model of an entity with access to CRUD messages
 * @param name - Name of the entity
 * @param method - HTTP method (POST, PUT, GET, DELETE)
 * @returns JSON
 */
function forge_ok_response(model: Object, name: string, method: string): Object {
    switch (method) {
    default:
    case 'post':
        return {
            message: model.Messages.set,
            change: `${method.toUpperCase()}_${name}`,
            entity: object,
        };
    case 'put':
        return {
            message: model.Messages.modify,
            change: `${method.toUpperCase()}_${name}`,
            entity: object,
        };
    case 'delete':
        return {
            message: model.Messages.remove,
            change: `${method.toUpperCase()}_${name}`,
        };
    }
}

exports.forge_ok_response = forge_ok_response;
