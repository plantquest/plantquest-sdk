"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main_go = void 0;
const jostraca_1 = require("jostraca");
const Main_go = (0, jostraca_1.cmp)(async function Main_go(props) {
    const { model, sdk } = props;
    (0, jostraca_1.File)({ name: model.Name + 'SDK.' + sdk.name }, () => {
        (0, jostraca_1.Code)(`
// ${model.Name} ${sdk.Name} SDK


class ${model.Name}SDK = {
  options: any

  make(options:any) {
    return new ${model.Name}SDK(options)
  }

  constructor(options:any) {
    this.options = options
  }
}

`);
    });
});
exports.Main_go = Main_go;
//# sourceMappingURL=Main_go.js.map