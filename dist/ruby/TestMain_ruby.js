"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMain = void 0;
const jostraca_1 = require("jostraca");
const TestEntity_ruby_1 = require("./TestEntity_ruby");
const TestMain = (0, jostraca_1.cmp)(function TestMain_ruby(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: toSnakeCase(model.name) + "_sdk_spec.rb" }, () => {
        (0, jostraca_1.Code)(`
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
        (0, jostraca_1.each)(model.main.sdk.entity, (entity) => {
            (0, TestEntity_ruby_1.TestEntity)({ model, build, entity });
        });
        (0, jostraca_1.Code)(`

end

`);
    });
});
exports.TestMain = TestMain;
function toSnakeCase(input) {
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
//# sourceMappingURL=TestMain_ruby.js.map