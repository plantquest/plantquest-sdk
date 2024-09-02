"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main_php = void 0;
const jostraca_1 = require("jostraca");
const Main_php = (0, jostraca_1.cmp)(function Main_php(props) {
    const { build, model } = props;
    (0, jostraca_1.Folder)({ name: 'src' }, () => {
        (0, jostraca_1.File)({ name: 'Main.' + build.name }, () => {
            (0, jostraca_1.Code)(`<?php
// ${model.Name} Main

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

// Example usage
\$asset = new Asset(\$sdk);
\$asset->save(['name' => 'New Asset']);

\$geofence = new Geofence(\$sdk);
\$geofence->save(['name' => 'New Geofence']);

\$room = new Room(\$sdk);
\$room->save(['name' => 'New Room']);

?>`);
        });
    });
});
exports.Main_php = Main_php;
//# sourceMappingURL=Main_php.js.map