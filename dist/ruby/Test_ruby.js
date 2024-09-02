"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const jostraca_1 = require("jostraca");
const Quick_ruby_1 = require("./Quick_ruby");
const TestMain_ruby_1 = require("./TestMain_ruby");
const Test = (0, jostraca_1.cmp)(function Test_ruby(props) {
    const { build } = props;
    (0, jostraca_1.Copy)({ from: "tm/" + build.name + "/.rspec", name: ".rspec" });
    (0, jostraca_1.Folder)({ name: 'spec' }, () => {
        (0, jostraca_1.Copy)({ from: "tm/" + build.name + "/spec/spec_helper.rb", name: "spec_helper.rb" });
        (0, Quick_ruby_1.Quick)({ build });
        (0, TestMain_ruby_1.TestMain)({ build });
    });
});
exports.Test = Test;
//# sourceMappingURL=Test_ruby.js.map