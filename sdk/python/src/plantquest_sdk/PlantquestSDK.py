
import json

from .Asset import Asset
from .Geofence import Geofence
from .Room import Room

def required(type_class, name, options):
    val = options[name]
    if(type_class != type(val)):
        raise Exception('PlantquestSDK: Invalid option: '+name+'='+val+': must be of type '+ str(type_class))



# Plantquest Python SDK


class PlantquestSDK:
    def __init__(self, options):
        self.options = options

        required(str, 'apikey', options)
        required(str, 'endpoint', options)


    @staticmethod
    def make(options):
        return PlantquestSDK(options)

    def endpoint(self, op, ent):
        data = ent.data
        return (
            self.options.get("endpoint")
            + "/"
            + ent.definition.get("name")
            + ((data.get("id") and "/" + data.get("id")) or "")
        )

    def method(self, op, ent=None):
        key = op
        if (None == ent or None == ent.id) and "save" == op:
            key = "create"

        if "create" == key:
            return "POST"
        elif "save" == key:
            return "PUT"
        elif "load" == key or "list" == key:
            return "GET"
        elif "remove" == key:
            return "DELETE"

    def body(self, op, ent):
        msg = {}
        msg.update(ent.data)

        return json.dumps(msg)

    def fetchSpec(self, op, ent):
        method = self.method(op, ent)
        spec = {
            "url": self.endpoint(op, ent),
            "method": method,
            "headers": {
                "content-type": "application/json",
                "authorization": "Bearer " + self.options["apikey"],
            },
            "body": ("GET" == method and {}) or self.body(op, ent),
        }
        return spec


    def Asset(self):
        return Asset(self, json.loads('''{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"unit":{"name":"unit","Name":"Unit","NAME":"UNIT","type":"string","Type":"String","TYPE":"STRING","short":"The unit identifier code (e.g. `px`, `m`)","key$":"unit"},"xval":{"name":"xval","Name":"Xval","NAME":"XVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The x coordinate value","key$":"xval"},"yval":{"name":"yval","Name":"Yval","NAME":"YVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The y coordinate value","key$":"yval"},"zval":{"name":"zval","Name":"Zval","NAME":"ZVAL","type":"number","Type":"Number","TYPE":"NUMBER","short":"The z coordinate value","key$":"zval"},"room_id":{"name":"room_id","Name":"Room_id","NAME":"ROOM_ID","type":"string","Type":"String","TYPE":"STRING","short":"The room that contains this asset. If a location Point is not specified, the centroid of the Room polygon is used","key$":"room_id"},"tag":{"name":"tag","Name":"Tag","NAME":"TAG","type":"string","Type":"String","TYPE":"STRING","short":"Building management tag","key$":"tag"}},"cmd":{},"name":"asset","Name":"Asset","NAME":"ASSET","publish":true,"key$":"asset","name$":"asset"}'''))

    def Geofence(self):
        return Geofence(self, json.loads('''{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"extent_id":{"name":"extent_id","Name":"Extent_id","NAME":"EXTENT_ID","type":"string","Type":"String","TYPE":"STRING","short":"The Extent containing this Geofence","key$":"extent_id"}},"cmd":{},"name":"geofence","Name":"Geofence","NAME":"GEOFENCE","publish":true,"key$":"geofence","name$":"geofence"}'''))

    def Room(self):
        return Room(self, json.loads('''{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/room","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/room","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{"custom":{"name":"custom","Name":"Custom","NAME":"CUSTOM","type":"object","Type":"Object","TYPE":"OBJECT","short":"A container object for custom data fields","key$":"custom"},"desc":{"name":"desc","Name":"Desc","NAME":"DESC","type":"string","Type":"String","TYPE":"STRING","short":"The description of the entity, if any","key$":"desc"},"id":{"name":"id","Name":"Id","NAME":"ID","type":"string","Type":"String","TYPE":"STRING","short":"The identifier of the entity - an opaque string","key$":"id"},"name":{"name":"name","Name":"Name","NAME":"NAME","type":"string","Type":"String","TYPE":"STRING","short":"The name of the Entity; context specific","key$":"name"},"polygon":{"name":"polygon","Name":"Polygon","NAME":"POLYGON","type":"object","Type":"Object","TYPE":"OBJECT","key$":"polygon"},"building_id":{"name":"building_id","Name":"Building_id","NAME":"BUILDING_ID","type":"string","Type":"String","TYPE":"STRING","short":"The Building that contains this Room","key$":"building_id"},"level":{"name":"level","Name":"Level","NAME":"LEVEL","type":"string","Type":"String","TYPE":"STRING","short":"The Building level of this Room.","key$":"level"},"surface_id":{"name":"surface_id","Name":"Surface_id","NAME":"SURFACE_ID","type":"string","Type":"String","TYPE":"STRING","short":"The floor of the Room rests on this Surface","key$":"surface_id"}},"cmd":{},"name":"room","Name":"Room","NAME":"ROOM","publish":true,"key$":"room","name$":"room"}'''))
