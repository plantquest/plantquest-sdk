<?php

use PHPUnit\Framework\TestCase;
use YourNamespace\PlantquestSDK;
use YourNamespace\Geofence;

class GeofenceTest extends TestCase {
    public function testSaveGeofence() {
        $options = [
            'apikey' => 'test_key',
            'endpoint' => 'https://api.plantquest.com',
            'fetch' => function ($url, $spec) {
                // Simulate an HTTP response
                return [
                    'status' => 200,
                    'json' => ['ent' => ['id' => '123', 'name' => 'Test Geofence']]
                ];
            }
        ];

        $sdk = new PlantquestSDK($options);
        $geofence = new Geofence($sdk);
        $result = $geofence->save(['name' => 'Test Geofence']);

        $this->assertEquals('123', $result->data['id']);
    }
}
