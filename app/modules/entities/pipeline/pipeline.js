// @flow
const ODM = require('../crud/odm');

class Pipeline extends ODM {
    async generate_model(index: string, type: string): Object {
        const mapping = await this.constructor.fetch_mapping(index, type,
                this._client);
        const info = this.db;
        console.log(info);

        return {
            Defaults: {},
            Mapping: mapping,
            Messages: {
                set: '',
                remove: '',
                modify: '',
            },
            Validation: [],
            Formatting: [],
            Completion: [],
            Name: type,
        };
    }
}

module.exports = Pipeline;
