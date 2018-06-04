const Request = require('superagent');
const Config = require('../../../../config');
const LangUtils = require('../../../utils/lang');

async function create(xml_tei: string, files: Array<string>): Promise<any> {
    const global_config = await LangUtils.get_config(Config._env);

    Request.post()
}

async function update(xml_tei: string, files: Array<string>, pid: string): Promise<any> {

}

async function remove(xml-tei: string, files: Array<string>, pid: string): Promise<any> {

}
