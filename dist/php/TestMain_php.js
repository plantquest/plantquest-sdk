"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMain = void 0;
const jostraca_1 = require("jostraca");
const TestEntity_php_1 = require("./TestEntity_php");
const TestMain = (0, jostraca_1.cmp)(function TestMain_php(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: model.name + 'SDK.test.' + build.name }, () => {
        (0, jostraca_1.Code)(`
const { test, describe } = require('node:test')
const { equal, deepEqual } = require('node:assert')

const { ${model.Name}SDK } = require('../')


describe('${model.Name}SDK', ()=>{
  test('happy', async ()=>{
    const client = makeClient()
    const out = await client.Geofence().load({id:'gf01'})
    console.log('Geofence.load', out)
    equal(out.data.id,'gf01')
  })

`);
        (0, jostraca_1.each)(model.main.sdk.entity, (entity) => {
            (0, TestEntity_php_1.TestEntity_php)({ model, build, entity });
        });
        (0, jostraca_1.Code)(`
})


function makeClient(config) {
  const client = ${model.Name}SDK.make({
    endpoint: 'https://host/api/v1/rest/project_id/plant/stage',
    apikey: 'apikey',
    fetch,
    ...config
  })

  return client
}

async function fetch(url, config) {
  const parts = url.split('/')
  const entname = parts[9]
  const entid = parts[10]
  const data = JSON.parse(config.body||'{}')
  const method = config.method || 'GET'

  const req$ = {
    url,
    parts,
    entname,
    entid,
    method,
    data,
  }

  console.log('REQ', req$)

  return {
    req$,
    status: 200,
    json: async function() {
      if('PUT'=== method||'POST'===method) {
        return entid ? {
          id: entid,
          title: data.title,
        } :
        {
          id: 'n01',
          title: data.title || 'T01',        
        }
      }
      else if('GET'===method) {
        return entid ? {
          id: entid,
          title: 'T01'
        } :
        {
          name: entname,
          list: [
            {
              id: 'n01',
              title: 'N01'
            },
            {
              id: 'n01',
              title: 'N01'
            },
          ]
        }
      }
      else {
        return {}
      }
    } 
  }
}


`);
    });
});
exports.TestMain = TestMain;
//# sourceMappingURL=TestMain_php.js.map