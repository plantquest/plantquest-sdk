"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main_python = void 0;
const jostraca_1 = require("jostraca");
const MainEntity_python_1 = require("./MainEntity_python");
const Test_python_1 = require("./Test_python");
const config_setup_files = [
    'setup.py',
    'pyproject.toml',
    'requirements.txt',
    'setup.cfg',
    'MANIFEST.in',
    'Makefile'
];
const Main_python = (0, jostraca_1.cmp)(async function Main_python(props) {
    const { build } = props;
    const { model } = props.ctx$;
    const entity = model.main.sdk.entity;
    (0, Test_python_1.Test)({ build });
    for (let config_file of config_setup_files) {
        (0, jostraca_1.Copy)({ from: 'tm/' + build.name + '/' + config_file, name: config_file });
    }
    (0, jostraca_1.Folder)({ name: 'src/' + model.name + '_sdk' }, () => {
        (0, jostraca_1.File)({ name: '__init__.py' }, () => {
            (0, jostraca_1.Code)(`from .${model.Name}SDK import *

`);
            (0, jostraca_1.each)(entity, (entity) => {
                entity.Name = (0, jostraca_1.camelify)(entity.name);
                (0, jostraca_1.Code)(`from .${entity.Name} import ${entity.Name}
`);
            });
            (0, jostraca_1.Code)(`__doc__ = 'An example SDK'
`);
        });
        (0, jostraca_1.File)({ name: model.Name + 'SDK.' + build.extension }, () => {
            const validate_options = (0, jostraca_1.each)(build.options)
                .reduce((a, opt) => a + ('String' === opt.kind ?
                `        required(str, '${opt.name}', options)\n` : ''), '');
            const imports = `
import json

`;
            (0, jostraca_1.Code)(`${imports}`);
            (0, jostraca_1.each)(entity, (entity) => {
                entity.Name = (0, jostraca_1.camelify)(entity.name);
                (0, jostraca_1.Code)(`from .${entity.Name} import ${entity.Name}
`);
            });
            (0, jostraca_1.Code)(`
def required(type_class, name, options):
    val = options[name]
    if(type_class != type(val)):
        raise Exception('${model.Name}SDK: Invalid option: '+name+'='+val+': must be of type '+ str(type_class))

`);
            (0, jostraca_1.Code)(`

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

`);
            (0, jostraca_1.each)(entity, (entity) => {
                (0, MainEntity_python_1.MainEntity)({ model, build, entity });
            });
        });
    });
});
exports.Main_python = Main_python;
//# sourceMappingURL=Main_python.js.map