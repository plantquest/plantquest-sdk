"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const jostraca_1 = require("jostraca");
const TestEntity = (0, jostraca_1.cmp)(function TestEntity_js(props) {
    const { entity } = props;
    entity.Name = (0, jostraca_1.camelify)(entity.name);
    // console.log(entity.op)
    // TODO: refactor via loop
    for (let key in entity.op) {
        // console.log(key)
    }
    (0, jostraca_1.Code)(`
def test_${entity.name}():
    config = dotenv_values('../.env.local')
    client = makeClient(config)

    # create
    out = client.${entity.Name}().create({ 'title': 'T03' })
    print('create', out)
    assert out == {'id': 'n03', 'title': 'T03'}

    # save
    out = client.${entity.Name}().save({ 'id': 'n03', 'title': 'T03_3'})
    print('save', out)
    assert out == { 'id': 'n03', 'title': 'T03_3' }

    # load
    out = client.${entity.Name}().load({ 'id': 't01' })
    print('load', out)
    assert out == {'id': 't01', 'title': 'T01'}

    # list
    out = client.${entity.Name}().list()
    assert out['list'] != None and len(out['list']) != 0
    assert out['name'] == "${entity.name}"
    print('list', out)
    # raise Exception('4')

`);
});
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity_python.js.map