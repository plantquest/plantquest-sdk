"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const jostraca_1 = require("jostraca");
const Quick_js_1 = require("./Quick_js");
const TestMain_js_1 = require("./TestMain_js");
const TestAccept_js_1 = require("./TestAccept_js");
const Test = (0, jostraca_1.cmp)(function Test_js(props) {
    const { build } = props;
    (0, jostraca_1.Folder)({ name: 'test' }, () => {
        (0, Quick_js_1.Quick)({ build });
        (0, TestMain_js_1.TestMain)({ build });
        (0, jostraca_1.Folder)({ name: 'accept' }, () => {
            (0, TestAccept_js_1.TestAccept)({ build });
        });
    });
});
exports.Test = Test;
//# sourceMappingURL=Test_js.js.map