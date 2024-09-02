<?php

use PHPUnit\Framework\TestCase;
use YourNamespace\PlantquestSDK;

class PlantquestSDKTest extends TestCase {
    public function testInitialization() {
        $options = [
            'apikey' => 'test_key',
            'endpoint' => 'https://api.plantquest.com'
        ];

        $sdk = new PlantquestSDK($options);
        $this->assertInstanceOf(PlantquestSDK::class, $sdk);
    }

    public function testInvalidOptions() {
        $this->expectException(Exception::class);
        $options = [
            'apikey' => 12345,  // Invalid type
            'endpoint' => 'https://api.plantquest.com'
        ];

        new PlantquestSDK($options);
    }
}
