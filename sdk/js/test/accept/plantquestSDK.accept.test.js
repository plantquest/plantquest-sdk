
const { test, describe } = require('node:test')
const { equal, deepEqual } = require('node:assert')

const { PlantquestSDK } = require('../../')


describe('PlantquestSDK Acceptance Tests', ()=>{
  test('happy', async ()=>{
    const client = makeClient()
    const out = await client.Geofence().load({id:'gf01'})
    console.log('Geofence.load', out)
    equal(out.data.id,'gf01')
  })


  test('asset-load', async ()=>{
    const client = makeClient()
    const out = await client.Asset().load({id:'t01'})
    console.log('load', out)

    // equal(out.status, 200, 'Expected status code 200');

    // Define the expected format
    const expectedFormat = {
      id: 'string',
      name: 'string',
      desc: 'string',
      custom: 'object',
    };

    const keys = Object.keys(expectedFormat);
    keys.forEach((key) => {
      equal(typeof out.data[key], expectedFormat[key], 'Expected ' + key + ' to be a ' + expectedFormat[key]);
    })

  })


  test('geofence-load', async ()=>{
    const client = makeClient()
    const out = await client.Geofence().load({id:'t01'})
    console.log('load', out)

    // equal(out.status, 200, 'Expected status code 200');

    // Define the expected format
    const expectedFormat = {
      id: 'string',
      name: 'string',
      desc: 'string',
      custom: 'object',
    };

    const keys = Object.keys(expectedFormat);
    keys.forEach((key) => {
      equal(typeof out.data[key], expectedFormat[key], 'Expected ' + key + ' to be a ' + expectedFormat[key]);
    })

  })


  test('room-load', async ()=>{
    const client = makeClient()
    const out = await client.Room().load({id:'t01'})
    console.log('load', out)

    // equal(out.status, 200, 'Expected status code 200');

    // Define the expected format
    const expectedFormat = {
      id: 'string',
      name: 'string',
      desc: 'string',
      custom: 'object',
    };

    const keys = Object.keys(expectedFormat);
    keys.forEach((key) => {
      equal(typeof out.data[key], expectedFormat[key], 'Expected ' + key + ' to be a ' + expectedFormat[key]);
    })

  })


})


function makeClient(config) {
  const client = PlantquestSDK.make({
    endpoint: 'http://localhost:4010/project01/plant01/stage01',
    apikey: 'apikey',
    ...config
  })

  return client
}

