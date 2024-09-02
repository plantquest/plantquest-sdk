"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity_ruby = void 0;
const jostraca_1 = require("jostraca");
const Entity_ruby = (0, jostraca_1.cmp)(function Entity_ruby(props) {
    const { build, entity } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.Folder)({ name: "lib" }, () => {
        (0, jostraca_1.Folder)({ name: toSnakeCase(model.Name) + "_sdk" }, () => {
            (0, jostraca_1.File)({ name: toSnakeCase(entity.Name) + ".rb" }, () => {
                (0, jostraca_1.Code)(`
# ${model.Name} ${build.Name} ${entity.Name}

require 'json'
require 'net/http'

class ${entity.Name}
  attr_accessor :sdk, :def, :data

  def initialize(sdk, def_hash)
    @sdk = sdk
    @def = def_hash
  end

  def save(data)
    self.data = data
    # TODO: validate data

    body = sdk.body('load', self)
    method = sdk.method('load', self)
    url = sdk.endpoint('load', self)
    
    response = sdk.options[:fetch].call(url, method, sdk.options[:apikey], body)
    status = response.code.to_i

    if status == 200
      json = JSON.parse(response.body, symbolize_names: true)
      # TODO: handle errors
      self.data = json[:ent]
      return self
    else
      raise "HTTP-ERROR: save: ${entity.Name}: #{status}"
    end
  end


  def load(data)
    self.data = data
    # TODO: check if data.id is defined

    body = sdk.body('load', self)
    method = sdk.method('load', self)
    url = sdk.endpoint('load', self)

    response = sdk.options[:fetch].call(url, method, sdk.options[:apikey], body)
    status = response.code.to_i

    if status == 200
      json = JSON.parse(response.body, symbolize_names: true)
      # TODO: handle errors
      self.data = json
    else
      raise "HTTP-ERROR: load: ${entity.Name}: #{status}"
    end

    self
  end

  def list(data = {})
    self.data = data
    # TODO: check if data.id is defined

    body = sdk.body('load', self)
    method = sdk.method('load', self)
    url = sdk.endpoint('load', self)

    response = sdk.options[:fetch].call(url, method, sdk.options[:apikey], body)
    status = response.code.to_i

    if status == 200
      json = JSON.parse(response.body, symbolize_names: true)
      # TODO: handle errors
      self.data = json
    else
      raise "HTTP-ERROR: load: ${entity.Name}: #{status}"
    end

    self
  end

end

`);
            });
        });
    });
});
exports.Entity_ruby = Entity_ruby;
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
//# sourceMappingURL=Entity_ruby.js.map