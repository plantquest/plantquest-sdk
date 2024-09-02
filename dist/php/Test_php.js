"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const jostraca_1 = require("jostraca");
const Quick_php_1 = require("./Quick_php");
const TestMain_php_1 = require("./TestMain_php");
const Test = (0, jostraca_1.cmp)(function Test_php(props) {
    const { build } = props;
    (0, jostraca_1.Folder)({ name: 'test' }, () => {
        (0, Quick_php_1.Quick_php)({ build });
        (0, TestMain_php_1.TestMain)({ build });
    });
});
exports.Test = Test;
//# sourceMappingURL=Test_php.js.map