
require 'dotenv'
Dotenv.load
require_relative '../lib/plantquest_sdk'

def run
  client = PlantquestSDK::Client.new(
    {
      endpoint: ENV['PLANTQUEST_ENDPOINT'],
      apikey: ENV['PLANTQUEST_APIKEY']
    }
  )

  out = client.Asset.list()
  puts "Asset.list: #{out}"
end

run

