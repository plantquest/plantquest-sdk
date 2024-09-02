
# Plantquest Ruby SDK

## Install

```

gem install rubySDK

```


## Options


* __apikey (String)__: PlantQuest API Key

* __endpoint (String)__: PlantQuest API URL


## Entities

### Entity: __Asset__


* __custom__ (object): A container object for custom data fields
  

* __desc__ (string): The description of the entity, if any
  

* __id__ (string): The identifier of the entity - an opaque string
  

* __name__ (string): The name of the Entity; context specific
  

* __room_id__ (string): The room that contains this asset. If a location Point is not specified, the centroid of the Room polygon is used
  

* __tag__ (string): Building management tag
  

* __unit__ (string): The unit identifier code (e.g. `px`, `m`)
  

* __xval__ (number): The x coordinate value
  

* __yval__ (number): The y coordinate value
  

* __zval__ (number): The z coordinate value
  

### Entity: __Geofence__


* __custom__ (object): A container object for custom data fields
  

* __desc__ (string): The description of the entity, if any
  

* __extent_id__ (string): The Extent containing this Geofence
  

* __id__ (string): The identifier of the entity - an opaque string
  

* __name__ (string): The name of the Entity; context specific
  

### Entity: __Room__


* __building_id__ (string): The Building that contains this Room
  

* __custom__ (object): A container object for custom data fields
  

* __desc__ (string): The description of the entity, if any
  

* __id__ (string): The identifier of the entity - an opaque string
  

* __level__ (string): The Building level of this Room.
  

* __name__ (string): The name of the Entity; context specific
  

* __polygon__ (object): undefined
  

* __surface_id__ (string): The floor of the Room rests on this Surface
  
