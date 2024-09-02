"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const jostraca_1 = require("jostraca");
const Entity = (0, jostraca_1.cmp)(function Entity(props) {
    const { build, entity } = props;
    const Entity_sdk = require(`./${build.name}/Entity_${build.name}`);
    Entity_sdk['Entity_' + build.name]({ build, entity });
});
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map