"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity_php = void 0;
const jostraca_1 = require("jostraca");
const Entity_php = (0, jostraca_1.cmp)(function Entity_php(props) {
    const { build, entity } = props;
    const { model } = props.ctx$;
    entity.name = entity.Name.toLowerCase();
    (0, jostraca_1.Folder)({ name: 'src' }, () => {
        (0, jostraca_1.File)({ name: entity.Name + '.' + build.extension }, () => {
            (0, jostraca_1.Code)(`<?php
// ${model.Name} ${build.Name} ${entity.Name}

class ${entity.Name} {
    private $sdk;
    private $data = [];

    public function __construct($sdk, $data = []) {
        $this->sdk = $sdk;
        $this->data = $data;
    }

    private function handleResult($op, $response, $handler) {
        $statusCode = $response['status'];

        if ($statusCode == 200) {
            $json = $response['json'];
            return $handler($json);
        } else {
            throw new Exception('HTTP-ERROR: ' . $op . ': ${entity.name}: ' . $statusCode);
        }
    }

    public function save($data) {
        $op = 'save';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this->data, $this->def);
        $response = $this->sdk->fetch($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json['ent'];
            return $this;
        });
    }

    public function load($data) {
        $op = 'load';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this->data, $this->def);
        $response = $this->sdk->fetch($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json;
            return $this;
        });
    }

    public function list($data = []) {
        $op = 'list';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this->data, $this->def);
        $response = $this->sdk->fetch($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json;
            return $this;
        });
    }

    public function remove($data) {
        $op = 'remove';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this->data, $this->def);
        $response = $this->sdk->fetch($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json;
            return $this;
        });
    }
}
`);
        });
    });
});
exports.Entity_php = Entity_php;
//# sourceMappingURL=Entity_php.js.map