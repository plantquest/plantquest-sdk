"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const jostraca_1 = require("jostraca");
const Main = (0, jostraca_1.cmp)(function Main(props) {
    const { build } = props;
    const { model } = props.ctx$;
    const Main_sdk = require(`./${build.name}/Main_${build.name}`);
    Main_sdk['Main_' + build.name]({ model, build });
    (0, jostraca_1.Copy)({ from: 'tm/' + build.name + '/LICENSE', name: 'LICENSE' });
});
exports.Main = Main;
//# sourceMappingURL=Main.js.map