"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main_js = void 0;
const jostraca_1 = require("jostraca");
const MainEntity_js_1 = require("./MainEntity_js");
const Test_js_1 = require("./Test_js");
const Main_js = (0, jostraca_1.cmp)(async function Main_js(props) {
    const { build } = props;
    const { model } = props.ctx$;
    const entity = model.main.sdk.entity;
    (0, jostraca_1.Copy)({ from: 'tm/' + build.name + '/package.json', name: 'package.json' });
    (0, Test_js_1.Test)({ build });
    (0, jostraca_1.Folder)({ name: 'src' }, () => {
        (0, jostraca_1.File)({ name: model.Name + 'SDK.' + build.name }, () => {
            (0, jostraca_1.Code)(`
// ${model.Name} ${build.Name} SDK
`);
            (0, jostraca_1.each)(entity, (entity) => {
                entity.Name = (0, jostraca_1.camelify)(entity.name);
                (0, jostraca_1.Code)(`
const { ${entity.Name} } = require('./${entity.Name}')
`);
            });
            const validate_options = (0, jostraca_1.each)(build.options)
                .reduce((a, opt) => a + ('String' === opt.kind ?
                `    required('string','${opt.name}',options)\n` : ''), '');
            (0, jostraca_1.Code)(`
    
class ${model.Name}SDK {
  options

  static make(options) {
    return new ${model.Name}SDK(options)
  }


  constructor(options) {
    this.options = options

${validate_options}

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

`);
            (0, jostraca_1.each)(entity, (entity) => {
                (0, MainEntity_js_1.MainEntity)({ model, build, entity });
            });
            (0, jostraca_1.Code)(`
}


function required(type,name,options) {
  const val = options[name]
  if(type !== typeof val) {
    throw new Error('${model.Name}SDK: Invalid option: '+name+'='+val+': must be of type '+type)
  }
}

module.exports = {
  ${model.Name}SDK
}

`);
        });
    });
});
exports.Main_js = Main_js;
//# sourceMappingURL=Main_js.js.map