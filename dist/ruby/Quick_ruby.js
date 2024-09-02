"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quick = void 0;
const jostraca_1 = require("jostraca");
const Quick = (0, jostraca_1.cmp)(function Quick_ruby(props) {
    const { build } = props;
    const { model } = props.ctx$;
    console.log("Quick_ruby", model);
    (0, jostraca_1.File)({ name: "quick." + "rb" }, () => {
        (0, jostraca_1.Code)(`
require 'dotenv'
Dotenv.load
require_relative '../lib/${model.name}_sdk'

def run
  client = ${model.Name}SDK::Client.new(
    {
      endpoint: ENV['${model.NAME}_ENDPOINT'],
      apikey: ENV['${model.NAME}_APIKEY']
    }
  )

  out = client.Asset.list()
  puts "Asset.list: #{out}"
end

run

`);
    });
});
exports.Quick = Quick;
//# sourceMappingURL=Quick_ruby.js.map