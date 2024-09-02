
# Plantquest Ruby Asset

require 'json'
require 'net/http'

class Asset
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
      raise "HTTP-ERROR: save: Asset: #{status}"
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
      raise "HTTP-ERROR: load: Asset: #{status}"
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
      raise "HTTP-ERROR: load: Asset: #{status}"
    end

    self
  end

end

