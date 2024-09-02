"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const jostraca_1 = require("jostraca");
const Quick_python_1 = require("./Quick_python");
const TestMain_python_1 = require("./TestMain_python");
const Test = (0, jostraca_1.cmp)(function Test_python(props) {
    const { build } = props;
    (0, jostraca_1.Folder)({ name: 'tests' }, () => {
        (0, Quick_python_1.Quick)({ build });
        (0, TestMain_python_1.TestMain)({ build });
    });
});
exports.Test = Test;
//# sourceMappingURL=Test_python.js.map