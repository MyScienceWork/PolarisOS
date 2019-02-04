const entities = ['user',
    'role',
    'identifier',
    'form',
    'entity',
    'pipeline',
    'function',
    'lang',
    'config',
    'mail_template',
    'chart',
    'widget',
    'menu',
    'template',
    'publication',
    'page',
    'importer',
    'exporter',
    'connector',
    'query',
    'tracking_stat'];

module.exports = entities.map(e => ({ type: e }));