"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quick = void 0;
const jostraca_1 = require("jostraca");
const Quick = (0, jostraca_1.cmp)(function Quick_js(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: 'quick.' + build.name }, () => {
        (0, jostraca_1.Code)(`
require('dotenv').config({ path: ['../../.env.local']})

const { ${model.Name}SDK } = require('../')

run()

async function run() {
   const client = ${model.Name}SDK.make({
     endpoint: process.env.${model.NAME}_ENDPOINT,
     apikey: process.env.${model.NAME}_APIKEY,
  })

  let out = await client.Geofence().load({id:'CF49B47C-317B-4387-83C3-4A23715B1C45'})
  console.log('Geofence.load', out) 

  out = await client.Geofence().list()
  console.log('Geofence.list', out) 
}

`);
    });
});
exports.Quick = Quick;
//# sourceMappingURL=Quick_js.js.map