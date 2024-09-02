"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainEntity = void 0;
const jostraca_1 = require("jostraca");
const MainEntity = (0, jostraca_1.cmp)(async function MainEntity(props) {
    const { model, entity } = props;
    (0, jostraca_1.Code)(`
func (m *${model.name}) ${entity.Name}(data ...Data) *${entity.name} {
  e := new (${entity.name})
  e.sdk = func () *${model.name} {return m}
  if data != nil {
    e.Data = data[0]
  }
  e.def = map[string]any{
    "name": "${entity.name}",
  }
  return e
}
`);
});
exports.MainEntity = MainEntity;
//# sourceMappingURL=MainEntity_go.js.map