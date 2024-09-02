
import { cmp, each, File, Code } from 'jostraca'


import { TestEntity } from './TestEntity_ruby'


const TestMain = cmp(function TestMain_ruby(props: any) {
  const { build } = props
  const { model } = props.ctx$


  File({ name: toSnakeCase(model.name) + "_sdk_spec.rb" }, () => {
    Code(`
RSpec.describe ${model.Name}SDK::Client do  
  before(:each) do
    ${model.Name}SDK.configure do |config|
      config[:apikey] = 'test_api_key'
      config[:endpoint] = 'http://example.com'
    end
    @client = ${model.Name}SDK::Client.new
  end

  describe '.configure' do
    it 'creates a new client with the given options' do
      expected_options = { apikey: 'test_api_key', endpoint: 'http://example.com' }
      expect(@client).to be_a(${model.Name}SDK::Client)
      expect(@client.options.reject { |key, _| key == :fetch }).to eq(expected_options)
    end

    it 'merges the options with the default options' do
      another_client = ${model.Name}SDK::Client.new(apikey: 'another_api_key')
      expect(another_client.options.reject { |key, _| key == :fetch }).to eq({ apikey: 'another_api_key', endpoint: 'http://example.com' })
    end
  end

  describe '#initialize' do
    it 'sets the options' do
      expected_options = { apikey: 'test_api_key', endpoint: 'http://example.com' }
      expect(@client.options.reject { |key, _| key == :fetch }).to eq(expected_options)
    end
  end

`);

    each(model.main.sdk.entity, (entity: any) => {
      TestEntity({ model, build, entity });
    });

    Code(`

end

`);
  });
})

function toSnakeCase(input: any[] | string): string {
  if (typeof input === "string") {
    return input
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      .replace(/[\s-]+/g, "_") // Replace spaces and dashes with underscores
      .toLowerCase();
  }
  return input
    .map((n) => String(n))
    .join("_")
    .toLowerCase();
}

export {
  TestMain
}

