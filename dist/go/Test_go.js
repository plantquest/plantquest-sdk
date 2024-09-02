"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const jostraca_1 = require("jostraca");
const Quick_go_1 = require("./Quick_go");
const TestMain_go_1 = require("./TestMain_go");
const TestAccept_go_1 = require("./TestAccept_go");
const Test = (0, jostraca_1.cmp)(function Test_go(props) {
    const { build } = props;
    (0, Quick_go_1.Quick)({ build });
    (0, TestMain_go_1.TestMain)({ build });
    (0, TestAccept_go_1.TestAccept)({ build });
});
exports.Test = Test;
//# sourceMappingURL=Test_go.js.map