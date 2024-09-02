"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainEntity = void 0;
const jostraca_1 = require("jostraca");
const MainEntity = (0, jostraca_1.cmp)(async function MainEntity(props) {
    const { entity } = props;
    const def = JSON.stringify(entity);
    (0, jostraca_1.Code)(`
    def ${entity.Name}(self):
        return ${entity.Name}(self, json.loads('''${def}'''))
`);
});
exports.MainEntity = MainEntity;
//# sourceMappingURL=MainEntity_python.js.map