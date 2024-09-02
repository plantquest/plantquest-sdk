<?php
// Asset PHP class
namespace PlantquestSDK;

class Asset {
    private $sdk;
    public $data = [];

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
            throw new Exception('HTTP-ERROR: ' . $op . ': Asset: ' . $statusCode);
        }
    }

    public function save($data) {
        $op = 'save';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this);
        $response = $this->sdk->options['fetch']($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json['ent'];
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

    public function list($data = []) {
        $op = 'list';
        $this->data = $data;

        $spec = $this->sdk->fetchSpec($op, $this);
        $response = $this->sdk->options['fetch']($spec['url'], $spec);

        return $this->handleResult($op, $response, function($json) {
            $this->data = $json;
            return $this;
        });
    }

    public function remove($data) {
        $op = 'remove';
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
