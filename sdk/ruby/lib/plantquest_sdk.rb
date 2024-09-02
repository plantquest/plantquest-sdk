
# Plantquest Ruby SDK

require 'json'
require 'net/http'

require_relative './plantquest_sdk/asset'

require_relative './plantquest_sdk/geofence'

require_relative './plantquest_sdk/room'


module PlantquestSDK
  @options = {}

  def self.config
    @options
  end

  def self.configure(&block)
    block.call(config)
  end

end

    
class PlantquestSDK::Client
  attr_reader :options

  # def self.configure(options)
  #  return new(options)
  # end

  def initialize(options = nil)
    @options = PlantquestSDK.config.merge(options || {})

        required('String','apikey', @options)
    required('String','endpoint', @options)


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


  def Asset
    Asset.new(self, {"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"unit":{"name":"unit","Name":"Unit","NAME":"UNIT","type":"string","Type":"String","TYPE":"STRING","short":"The unit identifier code (e.g. `px`, `m`)","key$":"unit"},"xval":{"name":"xval","Name":"Xval","NAME":"XVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The x coordinate value","key$":"xval"},"yval":{"name":"yval","Name":"Yval","NAME":"YVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The y coordinate value","key$":"yval"},"zval":{"name":"zval","Name":"Zval","NAME":"ZVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The z coordinate value","key$":"zval"},"room_id":{"name":"room_id","Name":"Room_id","NAME":"ROOM_ID","type":"string","Type":"String","TYPE":"STRING","short":"The room that contains this asset. If a location Point is not specified, the centroid of the Room polygon is used","key$":"room_id"},"tag":{"name":"tag","Name":"Tag","NAME":"TAG","type":"string","Type":"String","TYPE":"STRING","short":"Building management tag","key$":"tag"}},"cmd":{},"name":"asset","Name":"Asset","NAME":"ASSET","publish":true,"key$":"asset","name$":"asset"})
  end


  def Geofence
    Geofence.new(self, {"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"extent_id":{"name":"extent_id","Name":"Extent_id","NAME":"EXTENT_ID","type":"string","Type":"String","TYPE":"STRING","short":"The Extent containing this Geofence","key$":"extent_id"}},"cmd":{},"name":"geofence","Name":"Geofence","NAME":"GEOFENCE","publish":true,"key$":"geofence","name$":"geofence"})
  end


  def Room
    Room.new(self, {"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/room","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/room","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"polygon":{"name":"polygon","Name":"Polygon","NAME":"POLYGON","type":"object","Type":"Object","TYPE":"OBJECT","key$":"polygon"},"building_id":{"name":"building_id","Name":"Building_id","NAME":"BUILDING_ID","type":"string","Type":"String","TYPE":"STRING","short":"The Building that contains this Room","key$":"building_id"},"level":{"name":"level","Name":"Level","NAME":"LEVEL","type":"string","Type":"String","TYPE":"STRING","short":"The Building level of this Room.","key$":"level"},"surface_id":{"name":"surface_id","Name":"Surface_id","NAME":"SURFACE_ID","type":"string","Type":"String","TYPE":"STRING","short":"The floor of the Room rests on this Surface","key$":"surface_id"}},"cmd":{},"name":"room","Name":"Room","NAME":"ROOM","publish":true,"key$":"room","name$":"room"})
  end


end

private

  def required(type, name, options)
    val = options[name.to_sym]
    unless val.is_a?(Object.const_get(type))
      raise "PlantquestSDK: Invalid option: #{name}=#{val}: must be of type #{type}"
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

