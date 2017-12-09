// @flow
const ODM = require('../crud/odm');
const FormatFunctions = require('../../pipeline/formatter/formatfunctions');

class Pipeline extends ODM {
    async generate_formatters(): Promise<Array<any>> {
        const info = this.source;
        if ('formatters' in info && info.formatters.length > 0) {
            return info.formatters.map((f) => {
                switch (f.function.name) {
                case 'oarray_to_array':
                    return { [f.field]: a => FormatFunctions.oarray_to_array(a) };
                default:
                    return null;
                }
            }).filter(f => f != null);
        }
        return [];
    }

    async generate_model(index: string, type: string): Object {
        const mapping = await this.constructor.fetch_mapping(index, type,
                this._client);
        const formatters = await this.generate_formatters();

        return {
            Defaults: {},
            Mapping: mapping,
            Messages: {
                set: '',
                remove: '',
                modify: '',
            },
            Validation: [],
            Formatting: formatters,
            Completion: [],
            Name: type,
        };
    }
}

module.exports = Pipeline;
