import { cmp, File, Code, Folder } from 'jostraca'

const MainEntity_php = cmp(function MainEntity_php(props: any) {
  const { build, entity, model } = props

  Folder({ name: 'src' }, () => {

    File({ name: entity.Name + 'Main.' + build.name }, () => {

      Code(`<?php
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

?>`)
    })
  })
})

export {
  MainEntity_php
}
