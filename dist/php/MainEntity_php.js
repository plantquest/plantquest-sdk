"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainEntity_php = void 0;
const jostraca_1 = require("jostraca");
const MainEntity_php = (0, jostraca_1.cmp)(function MainEntity_php(props) {
    const { build, entity, model } = props;
    (0, jostraca_1.Folder)({ name: 'src' }, () => {
        (0, jostraca_1.File)({ name: entity.Name + 'Main.' + build.name }, () => {
            (0, jostraca_1.Code)(`<?php
// ${model.Name} ${build.Name} ${entity.Name} Main

require_once __DIR__ . '../../sdk/php/src/PlantquestSDK.php';
require_once __DIR__ . '../../sdk/php/src/${entity.Name}.php';

use PlantquestSDK\\PlantquestSDK;
use PlantquestSDK\\${entity.Name};

// Initialize the SDK
\$options = [
    'apikey' => 'your_api_key',
    'endpoint' => 'https://api.plantquest.com'
];

\$sdk = new PlantquestSDK(\$options);

// Example usage
\$${entity.Name.toLowerCase()} = new ${entity.Name}(\$sdk);
\$${entity.Name.toLowerCase()}->save(['name' => 'New ${entity.Name}']);
\$${entity.Name.toLowerCase()}->load(['id' => '123']);
\$${entity.Name.toLowerCase()}->list();
\$${entity.Name.toLowerCase()}->remove(['id' => '123']);

?>`);
        });
    });
});
exports.MainEntity_php = MainEntity_php;
//# sourceMappingURL=MainEntity_php.js.map