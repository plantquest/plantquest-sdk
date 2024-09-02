
// Plantquest Js SDK

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
    let data = ent.data || {}
    let def = ent.def
    return this.options.endpoint+'/'+def.name+(data.id?'/'+data.id:'')
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

  fetchSpec(op,ent) {
    const method = this.method(op, ent)
    const spec = {
      url: this.endpoint(op, ent),
      method,
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer '+this.options.apikey
      },
      body: 'GET' === method ? undefined : this.body(op, ent),
    }
    return spec
  }


  Asset(data) {
    const self = this
    return new Asset(self,data)
  }


  Geofence(data) {
    const self = this
    return new Geofence(self,data)
  }


  Room(data) {
    const self = this
    return new Room(self,data)
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

