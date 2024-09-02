"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAcceptEntity = void 0;
const jostraca_1 = require("jostraca");
const TestAcceptEntity = (0, jostraca_1.cmp)(function TestEntity_js(props) {
    const { entity } = props;
    entity.Name = (0, jostraca_1.camelify)(entity.name);
    (0, jostraca_1.Code)(`
  test('${entity.name}-load', async ()=>{
    const client = makeClient()
    const out = await client.${entity.Name}().load({id:'t01'})
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

`);
});
exports.TestAcceptEntity = TestAcceptEntity;
//# sourceMappingURL=TestAcceptEntity_js.js.map