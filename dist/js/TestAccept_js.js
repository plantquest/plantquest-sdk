"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAccept = void 0;
const jostraca_1 = require("jostraca");
const TestAcceptEntity_js_1 = require("./TestAcceptEntity_js");
const TestAccept = (0, jostraca_1.cmp)(function TestMain_js(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: model.name + 'SDK.accept.test.' + build.name }, () => {
        (0, jostraca_1.Code)(`
const { test, describe } = require('node:test')
const { equal, deepEqual } = require('node:assert')

const { ${model.Name}SDK } = require('../../')


describe('${model.Name}SDK Acceptance Tests', ()=>{
  test('happy', async ()=>{
    const client = makeClient()
    const out = await client.Geofence().load({id:'gf01'})
    console.log('Geofence.load', out)
    equal(out.data.id,'gf01')
  })

`);
        (0, jostraca_1.each)(model.main.sdk.entity, (entity) => {
            (0, TestAcceptEntity_js_1.TestAcceptEntity)({ model, build, entity });
        });
        (0, jostraca_1.Code)(`
})


function makeClient(config) {
  const client = ${model.Name}SDK.make({
    endpoint: 'http://localhost:4010/project01/plant01/stage01',
    apikey: 'apikey',
    ...config
  })

  return client
}

`);
    });
});
exports.TestAccept = TestAccept;
//# sourceMappingURL=TestAccept_js.js.map