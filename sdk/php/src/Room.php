<?php
// Plantquest PHP Room
namespace PlantquestSDK;

class Room {
    private $sdk;
    public $data = [];
    public $def = ['name' => 'room'];

    public function __construct($sdk, $data = []) {
        $this->sdk = $sdk;
        $this->data = $data;
    }

    private function handleResult($op, $response, $handler) {
        $status = $response['status'];

        if ($status == 200) {
            $json = $response['json'];
            return $handler($json);
        } else {
            throw new Exception('HTTP-ERROR: ' . $op . ': room: ' . $status);
        }
    }

    public function save($data) {
        $op = 'save';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this);
        $response = $this->sdk->options['fetch']($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json;
            return $this;
        });
    }

    public function load($data) {
        $op = 'load';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this);
        $response = $this->sdk->options['fetch']($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json;
            return $this;
        });
    }
}

?>
