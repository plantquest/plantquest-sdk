

import { cmp, each, camelify, File, Code, Folder, Copy } from 'jostraca'

import { MainEntity } from './MainEntity_python'
import { Test } from './Test_python'


const config_setup_files = [
  'setup.py',
  'pyproject.toml',
  'requirements.txt',
  'setup.cfg',
  'MANIFEST.in',
  'Makefile'
]

const Main_python = cmp(async function Main_python(props: any) {
  const { build } = props
  const { model } = props.ctx$

  const entity = model.main.sdk.entity


  Test({ build })

  for(let config_file of config_setup_files) {
    Copy({ from: 'tm/' + build.name + '/' + config_file, name: config_file })
  }

  Folder({ name: 'src/'+ model.name + '_sdk'}, () => {

    File({ name: '__init__.py' }, () => {
      Code(`from .${model.Name}SDK import *

`)

      each(entity, (entity: any) => {
        entity.Name = camelify(entity.name)
        Code(`from .${entity.Name} import ${entity.Name}
`)

      })

      Code(`__doc__ = 'An example SDK'
`)


    })

    File({ name: model.Name + 'SDK.' + build.extension }, () => {
    
      const validate_options = each(build.options)
        .reduce((a: string, opt: any) =>
          a + ('String' === opt.kind ?
            `        required(str, '${opt.name}', options)\n` : ''), '')

      const imports = `
import json

`
      Code(`${imports}`)

      each(entity, (entity: any) => {
        entity.Name = camelify(entity.name)
        Code(`from .${entity.Name} import ${entity.Name}
`)
      })


      Code(`
def required(type_class, name, options):
    val = options[name]
    if(type_class != type(val)):
        raise Exception('${model.Name}SDK: Invalid option: '+name+'='+val+': must be of type '+ str(type_class))

`)

      Code(`

# ${model.Name} ${build.Name} SDK


class ${model.Name}SDK:
    def __init__(self, options):
        self.options = options

${validate_options}

    @staticmethod
    def make(options):
        return ${model.Name}SDK(options)

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

`)

      each(entity, (entity: any) => {
        MainEntity({ model, build, entity })
      })


    })
  })
})


export {
  Main_python
}
