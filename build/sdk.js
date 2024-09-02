
const { SdkGen } = require('@voxgig/sdkgen')
const { Root } = require('../dist/Root')


module.exports = SdkGen.makeBuild(Root, {
  folder: __dirname+'/../sdk',
  def: __dirname+'/../def/assetmap-1.4.0.yml',
  meta: {
    name: 'Plantquest'
  },
  model: {
    folder: __dirname+'/../model',

    // TODO: move to model-config
    // TODO: fix reload of apidef if this changes
    entity: {
      asset: {
        path: {
          '/{projectid}/{plantid}/{stage}/asset': {
            op: { list: 'get', create: 'post' }
          },
          '/{projectid}/{plantid}/{stage}/asset/{entityid}': {
            op: { load: 'get', save: 'put', remove: 'delete' }
          },
        },
      },      
      room: {
        path: {
          '/{projectid}/{plantid}/{stage}/room': {
            op: { list: 'get', create: 'post' }
          },
          '/{projectid}/{plantid}/{stage}/room/{entityid}': {
            op: { load: 'get', save: 'put', remove: 'delete' }
          },
        }
      },      
      geofence: {
        path: {
          '/{projectid}/{plantid}/{stage}/geofence': {
            op: { list: 'get', create: 'post' }
          },
          '/{projectid}/{plantid}/{stage}/geofence/{entityid}': {
            op: { load: 'get', save: 'put', remove: 'delete' }
          },
        }
      },      
    }
  },
})

