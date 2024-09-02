"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity_php = void 0;
const jostraca_1 = require("jostraca");
const TestEntity_php = (0, jostraca_1.cmp)(function TestEntity_php(props) {
    const { build, entity, model } = props;
    (0, jostraca_1.Folder)({ name: 'tests' }, () => {
        (0, jostraca_1.File)({ name: entity.Name + 'Test.' + build.name }, () => {
            (0, jostraca_1.Code)(`<?php
// ${model.Name} ${build.Name} ${entity.Name} Test

use PHPUnit\Framework\TestCase;
use PlantquestSDK\\PlantquestSDK;
use PlantquestSDK\\${entity.Name};

class ${entity.Name}Test extends TestCase {

    protected \$sdk;
    protected \$${entity.Name.toLowerCase()};

    protected function setUp(): void {
        \$options = [
            'apikey' => 'your_api_key',
            'endpoint' => 'https://api.plantquest.com'
        ];

        \$this->sdk = new PlantquestSDK(\$options);
        \$this->${entity.Name.toLowerCase()} = new ${entity.Name}(\$this->sdk);
    }

    public function testSave${entity.Name}() {
        \$data = ['name' => 'Test ${entity.Name}'];
        \$result = \$this->${entity.Name.toLowerCase()}->save(\$data);
        \$this->assertEquals('Test ${entity.Name}', \$result->data['name']);
    }

    public function testLoad${entity.Name}() {
        \$data = ['id' => '123'];
        \$result = \$this->${entity.Name.toLowerCase()}->load(\$data);
        \$this->assertEquals('123', \$result->data['id']);
    }

    public function testList${entity.Name}s() {
        \$result = \$this->${entity.Name.toLowerCase()}->list();
        \$this->assertIsArray(\$result->data);
    }

    public function testRemove${entity.Name}() {
        \$data = ['id' => '123'];
        \$result = \$this->${entity.Name.toLowerCase()}->remove(\$data);
        \$this->assertNull(\$result->data);
    }
}
?>`);
        });
    });
});
exports.TestEntity_php = TestEntity_php;
//# sourceMappingURL=TestEntity_php.js.map