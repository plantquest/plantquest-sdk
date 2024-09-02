"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quick_php = void 0;
const jostraca_1 = require("jostraca");
const Quick_php = (0, jostraca_1.cmp)(function Quick_php(props) {
    const { build, model } = props;
    (0, jostraca_1.Folder)({ name: 'src' }, () => {
        (0, jostraca_1.File)({ name: 'QuickStart.' + build.name }, () => {
            (0, jostraca_1.Code)(`<?php
// ${model.Name} QuickStart

require_once __DIR__ . '../../sdk/php/src/PlantquestSDK.php';
require_once __DIR__ . '../../sdk/php/src/Asset.php';
require_once __DIR__ . '../../sdk/php/src/Geofence.php';
require_once __DIR__ . '../../sdk/php/src/Room.php';

use PlantquestSDK\\PlantquestSDK;
use PlantquestSDK\\Asset;
use PlantquestSDK\\Geofence;
use PlantquestSDK\\Room;

// Initialize the SDK
\$options = [
    'apikey' => 'your_api_key',
    'endpoint' => 'https://api.plantquest.com'
];

\$sdk = new PlantquestSDK(\$options);

// Quick example usage
\$asset = new Asset(\$sdk);
\$asset->save(['name' => 'New Asset']);
\$asset->load(['id' => '123']);
\$asset->list();
\$asset->remove(['id' => '123']);

\$geofence = new Geofence(\$sdk);
\$geofence->save(['name' => 'New Geofence']);
\$geofence->load(['id' => '456']);
\$geofence->list();
\$geofence->remove(['id' => '456']);

\$room = new Room(\$sdk);
\$room->save(['name' => 'New Room']);
\$room->load(['id' => '789']);
\$room->list();
\$room->remove(['id' => '789']);

?>`);
        });
    });
});
exports.Quick_php = Quick_php;
//# sourceMappingURL=Quick_php.js.map