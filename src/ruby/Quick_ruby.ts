import { cmp, File, Code } from "jostraca";

const Quick = cmp(function Quick_ruby(props: any) {
  const { build } = props;
  const { model } = props.ctx$;

  console.log("Quick_ruby", model);

  File({ name: "quick." + "rb" }, () => {
    Code(`
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

export { Quick };
