"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity_js = void 0;
const jostraca_1 = require("jostraca");
const Entity_js = (0, jostraca_1.cmp)(function Entity_js(props) {
    const { build, entity } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.Folder)({ name: 'src' }, () => {
        (0, jostraca_1.File)({ name: entity.Name + '.' + build.name }, () => {
            (0, jostraca_1.Code)(`
// ${model.Name} ${build.Name} ${entity.Name}

class ${entity.Name} {
  def
  data


  constructor(sdk,data) {
    this.sdk = ()=>sdk
    this.def = {
      name: '${entity.name}'
    }
    // data is optional
    this.data = data
  }


  async handleResult(op, res, spec, handler) {
    const status = res.status

    if(200 === status) {
      const json = await res.json()
      // TODO: error
      return handler(json)
    }
    else {
      throw new Error('HTTP-ERROR: '+op+': ${entity.name}: '+status)
    }
  }


  async save(data) {
    const op = 'save'
    this.data = data
    // TODO: validate data

    const spec = this.sdk().fetchSpec(op,this)
    const res = await this.sdk().options.fetch(spec.url,spec)

    return this.handleResult(op, res, spec, (json)=>{
      this.data = json
      return this
    })
  }


  async load(data) {
    const op = 'load'
    this.data = data
    // TODO: check data.id defined
    // TODO: separate data and query

    const spec = this.sdk().fetchSpec(op,this)
    const res = await this.sdk().options.fetch(spec.url,spec)

   return this.handleResult(op, res, spec, (json)=>{
      this.data = json
      return this
    })
  }


  async remove(data) {
    const op = 'remove'
    this.data = data
    // TODO: check data.id defined

    const spec = this.sdk().fetchSpec(op,this)
    const res = await this.sdk().options.fetch(spec.url,spec)

    return this.handleResult(op, res, spec, (json)=>{
      this.data = json
      return null
    })
  }


  async list(query) {
    const op = 'list'
    // TODO: use query if defined

    const spec = this.sdk().fetchSpec(op,this)
    const res = await this.sdk().options.fetch(spec.url,spec)

    return this.handleResult(op, res, spec, (json)=>{
      return json.list.map(data=>this.sdk().${entity.Name}(data))
    })
  }

}


module.exports = {
  ${entity.Name}
}

`);
        });
    });
});
exports.Entity_js = Entity_js;
//# sourceMappingURL=Entity_js.js.map