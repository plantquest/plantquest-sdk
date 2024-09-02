"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMain = void 0;
const jostraca_1 = require("jostraca");
const TestEntity_python_1 = require("./TestEntity_python");
const TestMain = (0, jostraca_1.cmp)(function TestMain_js(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: 'Fetch.' + build.extension }, () => {
        (0, jostraca_1.Code)(`
import json

def fetch(url, config):
    parts = url.split("/")
    # print('parts: ', parts)
    entname = None
    entid = None

    try:
        # TODO: PARTS DEPEND ON THE SWAGGERS: add logic
        # A utility for url parsing is needed
        entname = parts[1]
        entid = parts[2]
    except IndexError:
        pass

    data = json.loads(config.get("body") or "{}")
    method = config.get("method") or "GET"

    req = {
        "url": url,
        "parts": parts,
        "entname": entname,
        "entid": entid,
        "method": method,
        "data": data,
    }

    json_data = None
    if "GET" == method:
        if None != entid:
            json_data = {"id": entid, "title": "T01"}
        else:
            json_data = {
                "name": entname,
                "list": [{"id": "n01", "title": "N01"}, {"id": "n02", "title": "N02"}],
            }
    elif "PUT" == method or "POST" == method:
        if None != entid:
            json_data = { "id": entid, "title": data.get('title') }
        else:
            json_data = { "id": "n03", "title": data.get('title') or "T03" }

    return {"req": req, "status": 200, "json": json_data}
`);
    });
    (0, jostraca_1.File)({ name: 'test_' + model.name + '_sdk.' + build.extension }, () => {
        (0, jostraca_1.Code)(`
import json

from dotenv import dotenv_values

import ${model.name}_sdk

from Fetch import fetch


def makeClient(config = {}):
    client = ${model.name}_sdk.${model.Name}SDK.make({
        'endpoint': config['${model.NAME}_ENDPOINT'],
        'apikey': config['${model.NAME}_APIKEY'],
        'fetch': fetch
    })
    return client

`);
        (0, jostraca_1.Code)(`
def test_happy():
    config = dotenv_values('../.env.local')
    client = makeClient(config)
    `);
        (0, jostraca_1.each)(model.main.sdk.entity, (entity) => {
            (0, TestEntity_python_1.TestEntity)({ model, build, entity });
        });
    });
});
exports.TestMain = TestMain;
//# sourceMappingURL=TestMain_python.js.map