
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
        return Asset(self, json.loads('''{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/asset","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/asset/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{},"cmd":{},"name":"asset","Name":"Asset","NAME":"ASSET","publish":true,"key$":"asset","name$":"asset"}'''))

    def Geofence(self):
        return Geofence(self, json.loads('''{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/geofence","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/geofence/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{},"cmd":{},"name":"geofence","Name":"Geofence","NAME":"GEOFENCE","publish":true,"key$":"geofence","name$":"geofence"}'''))

    def Room(self):
        return Room(self, json.loads('''{"op":{"create":{"path":"/{projectid}/{plantid}/{stage}/room","method":"post","param":{},"query":{},"name":"create","Name":"Create","NAME":"CREATE"},"list":{"path":"/{projectid}/{plantid}/{stage}/room","method":"get","param":{},"query":{"filter":{"required":false,"name":"filter","Name":"Filter","NAME":"FILTER","type":"string","Type":"String","TYPE":"STRING"},"page":{"required":false,"name":"page","Name":"Page","NAME":"PAGE","type":"string","Type":"String","TYPE":"STRING"}},"name":"list","Name":"List","NAME":"LIST"},"load":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"get","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"load","Name":"Load","NAME":"LOAD"},"remove":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"delete","param":{"entityid":{"required":true,"name":"entityid","Name":"Entityid","NAME":"ENTITYID","type":"string","Type":"String","TYPE":"STRING"}},"query":{},"name":"remove","Name":"Remove","NAME":"REMOVE"},"save":{"path":"/{projectid}/{plantid}/{stage}/room/{entityid}","method":"put","param":{},"query":{},"name":"save","Name":"Save","NAME":"SAVE"}},"field":{},"cmd":{},"name":"room","Name":"Room","NAME":"ROOM","publish":true,"key$":"room","name$":"room"}'''))
