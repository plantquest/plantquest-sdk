"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const jostraca_1 = require("jostraca");
const Readme_1 = require("./Readme");
const Main_1 = require("./Main");
const Entity_1 = require("./Entity");
const Root = (0, jostraca_1.cmp)(function Root(props) {
    const { model, ctx$ } = props;
    (0, jostraca_1.names)(model, model.name);
    // console.dir(model, { depth: null })
    ctx$.model = model;
    const build = model.main.sdk.build;
    const entity = model.main.sdk.entity;
    console.log('PROJECT-b', model.name, ctx$.meta.spec.build.id);
    (0, jostraca_1.Project)({}, () => {
        (0, jostraca_1.each)(build, (build) => {
            (0, jostraca_1.names)(build, build.name);
            console.log('BUILD', build.name);
            (0, jostraca_1.Folder)({ name: build.name }, () => {
                (0, jostraca_1.each)(entity, (entity) => {
                    (0, jostraca_1.names)(entity, entity.name);
                    console.log('ENTITY', entity.name);
                    (0, Entity_1.Entity)({ build, entity });
                });
                (0, Main_1.Main)({ build });
                (0, Readme_1.Readme)({ build });
            });
        });
    });
});
exports.Root = Root;
//# sourceMappingURL=Root.js.map