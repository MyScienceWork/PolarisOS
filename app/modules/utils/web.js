// @flow
const ODM = require('../entities/crud/odm');

/**
 * Forge a standard response when returning HTTP 200 for any request
 * @param model - Model of an entity with access to CRUD messages
 * @param name - Name of the entity
 * @param method - HTTP method (POST, PUT, GET, DELETE)
 * @returns JSON
 */
function forge_ok_response(object: Object, method: string): Object {
    switch (method) {
    default:
    case 'post':
        return {
            message: object.messages.set,
            change: `${method.toUpperCase()}_${object.name}`,
            entity: object,
        };
    case 'put':
        return {
            message: object.messages.modify,
            change: `${method.toUpperCase()}_${object.name}`,
            entity: object,
        };
    case 'delete':
        return {
            message: object.messages.remove,
            change: `${method.toUpperCase()}_${object.name}`,
        };
    }
}

exports.forge_ok_response = forge_ok_response;
