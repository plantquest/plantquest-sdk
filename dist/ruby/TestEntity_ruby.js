"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const jostraca_1 = require("jostraca");
const TestEntity = (0, jostraca_1.cmp)(function TestEntity_ruby(props) {
    const { entity, model } = props;
    entity.Name = (0, jostraca_1.camelify)(entity.name);
    (0, jostraca_1.Code)(`
    describe '${entity.name}-load' do
      it 'loads the entity with the correct data' do
        stub_request(:get, "http://example.com/${entity.name}/t01")
        .to_return(body: { id: 't01', title: 'T01' }.to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.${entity.Name}.load(id: 't01')
        expect(out.data).to eq({ id: 't01', title: 'T01' })
      end
    end

    describe '${entity.name}-list' do
      it 'lists the entities with the correct data' do
        stub_request(:get, "http://example.com/${entity.name}")
        .to_return(body: [{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }].to_json, headers: { 'Content-Type' => 'application/json' })

        out = @client.${entity.Name}.list
        expect(out.data).to eq([{ id: 't01', title: 'T01' }, { id: 't02', title: 'T02' }])
      end
    end
`);
});
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity_ruby.js.map