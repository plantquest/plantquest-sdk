
// Plantquest Ruby SDK

const { Asset } = require('./Asset')

const { Geofence } = require('./Geofence')

const { Room } = require('./Room')

    
class PlantquestSDK {
  options

  static make(options) {
    return new PlantquestSDK(options)
  }


  constructor(options) {
    this.options = options

    required('string','apikey',options)
    required('string','endpoint',options)


    this.options.fetch = this.options.fetch || fetch 
  }


  endpoint(op,ent) {
    let data = ent.data
    return this.options.endpoint+'/'+ent.def.name+(data.id?'/'+data.id:'')
  }

  method(op,ent) {
    let key = (null == ent || null === ent.id) && 'save' === op ? 'create' : op
    return ({
      create: 'POST',
      save: 'PUT',
      load: 'GET',
      list: 'GET',
      remove: 'DELETE',
    })[op]
  }

  body(op,ent) {
    const msg = { ...ent.data }  
    return JSON.stringify(msg)
  }


  Asset() {
    const self = this
    return new Asset(self,{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"unit":{"name":"unit","Name":"Unit","NAME":"UNIT","type":"string","Type":"String","TYPE":"STRING","short":"The unit identifier code (e.g. `px`, `m`)","key$":"unit"},"xval":{"name":"xval","Name":"Xval","NAME":"XVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The x coordinate value","key$":"xval"},"yval":{"name":"yval","Name":"Yval","NAME":"YVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The y coordinate value","key$":"yval"},"zval":{"name":"zval","Name":"Zval","NAME":"ZVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The z coordinate value","key$":"zval"},"room_id":{"name":"room_id","Name":"Room_id","NAME":"ROOM_ID","type":"string","Type":"String","TYPE":"STRING","short":"The room that contains this asset. If a location Point is not specified, the centroid of the Room polygon is used","key$":"room_id"},"tag":{"name":"tag","Name":"Tag","NAME":"TAG","type":"string","Type":"String","TYPE":"STRING","short":"Building management tag","key$":"tag"}},"cmd":{},"name":"asset","Name":"Asset","NAME":"ASSET","publish":true,"key$":"asset","name$":"asset"})
  }


  Geofence() {
    const self = this
    return new Geofence(self,{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"extent_id":{"name":"extent_id","Name":"Extent_id","NAME":"EXTENT_ID","type":"string","Type":"String","TYPE":"STRING","short":"The Extent containing this Geofence","key$":"extent_id"}},"cmd":{},"name":"geofence","Name":"Geofence","NAME":"GEOFENCE","publish":true,"key$":"geofence","name$":"geofence"})
  }


  Room() {
    const self = this
    return new Room(self,{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/room","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/room","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"polygon":{"name":"polygon","Name":"Polygon","NAME":"POLYGON","type":"object","Type":"Object","TYPE":"OBJECT","key$":"polygon"},"building_id":{"name":"building_id","Name":"Building_id","NAME":"BUILDING_ID","type":"string","Type":"String","TYPE":"STRING","short":"The Building that contains this Room","key$":"building_id"},"level":{"name":"level","Name":"Level","NAME":"LEVEL","type":"string","Type":"String","TYPE":"STRING","short":"The Building level of this Room.","key$":"level"},"surface_id":{"name":"surface_id","Name":"Surface_id","NAME":"SURFACE_ID","type":"string","Type":"String","TYPE":"STRING","short":"The floor of the Room rests on this Surface","key$":"surface_id"}},"cmd":{},"name":"room","Name":"Room","NAME":"ROOM","publish":true,"key$":"room","name$":"room"})
  }


}


function required(type,name,options) {
  const val = options[name]
  if(type !== typeof val) {
    throw new Error('PlantquestSDK: Invalid option: '+name+'='+val+': must be of type '+type)
  }
}

module.exports = {
  PlantquestSDK
}

