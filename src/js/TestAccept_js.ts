
import { cmp, each, File, Code } from 'jostraca'


import { TestAcceptEntity } from "./TestAcceptEntity_js"


const TestAccept = cmp(function TestMain_js(props: any) {
  const { build } = props
  const { model } = props.ctx$


  File({ name: model.name + 'SDK.accept.test.' + build.name }, () => {

    Code(`
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

`)

    each(model.main.sdk.entity, (entity: any) => {
      TestAcceptEntity({ model, build, entity })
    })


    Code(`
})


function makeClient(config) {
  const client = ${model.Name}SDK.make({
    endpoint: 'http://localhost:4010/project01/plant01/stage01',
    apikey: 'apikey',
    ...config
  })

  return client
}

`)

  })
})


export {
  TestAccept
}

