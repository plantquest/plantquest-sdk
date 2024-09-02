"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quick = void 0;
const jostraca_1 = require("jostraca");
const Quick = (0, jostraca_1.cmp)(function Quick_python(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: 'quick.' + build.extension }, () => {
        (0, jostraca_1.Code)(`

from pathlib import Path
import sys
import json

from dotenv import dotenv_values

path_root = Path(__file__).parents[1]
sys.path.append(str(path_root))

from src import ${model.name}_sdk

from Fetch import fetch

config = dotenv_values("../../.env.local")


print("config: ", config)


print(${model.name}_sdk.${model.Name}SDK)
print(dir(${model.name}_sdk))


if __name__ == "__main__":
    client = ${model.name}_sdk.${model.Name}SDK.make({
        'endpoint': config['${model.NAME}_ENDPOINT'],
        'apikey': config['${model.NAME}_APIKEY'],
        'fetch': fetch
    })

    out = client.Room().load({"id": "CF49B47C-317B-4387-83C3-4A23715B1C45"})
    print("Geofence.load", out)


`);
    });
});
exports.Quick = Quick;
//# sourceMappingURL=Quick_python.js.map