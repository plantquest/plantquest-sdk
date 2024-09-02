"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAccept = void 0;
const jostraca_1 = require("jostraca");
const TestAcceptEntity_go_1 = require("./TestAcceptEntity_go");
const TestAccept = (0, jostraca_1.cmp)(function TestMain_go(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: model.name + 'sdk_accept_test.' + build.name }, () => {
        (0, jostraca_1.Code)(`
package ${model.name}

import (
  "testing"
)
         `);
        (0, jostraca_1.each)(model.main.sdk.entity, (entity) => {
            (0, TestAcceptEntity_go_1.TestAcceptEntity)({ model, build, entity });
        });
    });
});
exports.TestAccept = TestAccept;
//# sourceMappingURL=TestAccept_go.js.map