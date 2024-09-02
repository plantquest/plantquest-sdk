
require('dotenv').config({ path: ['../../.env.local']})

const { PlantquestSDK } = require('../')

run()

async function run() {
   const client = PlantquestSDK.make({
     endpoint: process.env.PLANTQUEST_ENDPOINT,
     apikey: process.env.PLANTQUEST_APIKEY,
  })

  let out = await client.Geofence().load({id:'CF49B47C-317B-4387-83C3-4A23715B1C45'})
  console.log('Geofence.load', out) 

  out = await client.Geofence().list()
  console.log('Geofence.list', out) 
}

