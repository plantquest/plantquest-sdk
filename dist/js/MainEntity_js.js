"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainEntity = void 0;
const jostraca_1 = require("jostraca");
const MainEntity = (0, jostraca_1.cmp)(async function MainEntity(props) {
    const { entity } = props;
    (0, jostraca_1.Code)(`
  ${entity.Name}(data) {
    const self = this
    return new ${entity.Name}(self,data)
  }

`);
});
exports.MainEntity = MainEntity;
//# sourceMappingURL=MainEntity_js.js.map