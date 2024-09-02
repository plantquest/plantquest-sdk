import { cmp, camelify, Code } from "jostraca";

const TestEntity = cmp(function TestEntity_ruby(props: any) {
  const { entity, model } = props;

  entity.Name = camelify(entity.name);

  Code(`
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

export { TestEntity };
