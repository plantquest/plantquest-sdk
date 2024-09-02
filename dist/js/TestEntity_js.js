"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const jostraca_1 = require("jostraca");
const TestEntity = (0, jostraca_1.cmp)(function TestEntity_js(props) {
    const { entity } = props;
    entity.Name = (0, jostraca_1.camelify)(entity.name);
    (0, jostraca_1.Code)(`
  test('${entity.name}-load', async ()=>{
    const client = makeClient()
    const out = await client.${entity.Name}().load({id:'t01'})
    console.log('load', out)
    deepEqual(out.data,{id:'t01',title:'T01'})
  })

`);
});
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity_js.js.map