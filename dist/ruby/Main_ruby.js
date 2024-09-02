"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main_ruby = void 0;
const jostraca_1 = require("jostraca");
const MainEntity_ruby_1 = require("./MainEntity_ruby");
const Test_ruby_1 = require("./Test_ruby");
const Main_ruby = (0, jostraca_1.cmp)(async function Main_ruby(props) {
    const { build } = props;
    const { model } = props.ctx$;
    const entity = model.main.sdk.entity;
    (0, jostraca_1.Copy)({ from: "tm/" + build.name + "/Gemfile", name: "Gemfile" });
    const gemspecName = toSnakeCase(model.Name) + "_sdk.gemspec";
    (0, jostraca_1.Copy)({ from: "tm/" + build.name + "/" + gemspecName, name: gemspecName });
    (0, jostraca_1.Copy)({ from: "tm/" + build.name + "/Rakefile", name: "Rakefile" });
    (0, Test_ruby_1.Test)({ build });
    (0, jostraca_1.Folder)({ name: "lib" }, () => {
        (0, jostraca_1.File)({ name: toSnakeCase(model.Name) + "_sdk.rb" }, () => {
            (0, jostraca_1.Code)(`
# ${model.Name} ${build.Name} SDK

require 'json'
require 'net/http'
`);
            (0, jostraca_1.each)(entity, (entity) => {
                entity.Name = (0, jostraca_1.camelify)(entity.name);
                (0, jostraca_1.Code)(`
require_relative './${toSnakeCase(model.Name)}_sdk/${toSnakeCase(entity.Name)}'
`);
            });
            const validate_options = (0, jostraca_1.each)(build.options).reduce((a, opt) => a +
                ("String" === opt.kind
                    ? `    required('String','${opt.name}', @options)\n`
                    : ""), "");
            (0, jostraca_1.Code)(`

module ${model.Name}SDK
  @options = {}

  def self.config
    @options
  end

  def self.configure(&block)
    block.call(config)
  end

end

    
class ${model.Name}SDK::Client
  attr_reader :options

  # def self.configure(options)
  #  return new(options)
  # end

  def initialize(options = nil)
    @options = ${model.Name}SDK.config.merge(options || {})

    ${validate_options}

    @options[:fetch] ||= ->(url, method, apikey, body = nil) {
      default_fetch(url, method, apikey, body)
    }
  end

  def endpoint(op, ent)
    data = ent.data
    "#{@options[:endpoint]}/#{ent.def[:name]}#{data[:id] ? "/#{data[:id]}" : ''}"
  end

  def method(op, ent)
    # key = ent.nil? || ent[:id].nil? && op == 'save' ? 'create' : op
    key = ent.nil? && op == 'save' ? 'create' : op
    {
      'create' => 'POST',
      'save' => 'PUT',
      'load' => 'GET',
      'list' => 'GET',
      'remove' => 'DELETE'
    }[op]
  end

  def body(op, ent)
    msg = ent.data.dup
    JSON.generate(msg)
  end

`);
            (0, jostraca_1.each)(entity, (entity) => {
                (0, MainEntity_ruby_1.MainEntity)({ model, build, entity });
            });
            (0, jostraca_1.Code)(`
end

private

  def required(type, name, options)
    val = options[name.to_sym]
    unless val.is_a?(Object.const_get(type))
      raise "${model.Name}SDK: Invalid option: #{name}=#{val}: must be of type #{type}"
    end
  end

  def default_fetch(url, method, apikey, body = nil)
    puts "fetch: method:#{method} url:#{url} body:#{body} key:#{apikey}"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == "https")

    request = Net::HTTP.const_get(method.capitalize).new(uri)
    request['Content-Type'] = 'application/json'
    request['Authorization'] = "Bearer #{apikey}"

    if %w[POST PUT].include?(method.upcase)
      request.body = body.to_json if body
    end

    response = http.request(request)
    response
  end

`);
        });
    });
});
exports.Main_ruby = Main_ruby;
// TODO: Replace with jostraca' snakify
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
//# sourceMappingURL=Main_ruby.js.map