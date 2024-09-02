<?php
// Plantquest PHP SDK
namespace PlantquestSDK;

class PlantquestSDK {
    private $options;

    public static function make($options) {
        return new self($options);
    }

    public function __construct($options) {
        $this->options = $options;

        $this->required('string', 'apikey', $options);
        $this->required('string', 'endpoint', $options);

        $this->options['fetch'] = $this->options['fetch'] ?? 'fetch';
    }

    public function endpoint($op, $ent) {
        $data = $ent->data ?? [];
        $def = $ent->def;
        return $this->options['endpoint'] . '/' . $def['name'] . (!empty($data['id']) ? '/' . $data['id'] : '');
    }

    public function method($op, $ent) {
        $key = (null === $ent || null === $ent->id) && $op === 'save' ? 'create' : $op;
        $methods = [
            'create' => 'POST',
            'save' => 'PUT',
            'load' => 'GET',
            'list' => 'GET',
            'remove' => 'DELETE',
        ];
        return $methods[$op];
    }

    public function body($op, $ent) {
        return json_encode($ent->data);
    }

    public function fetchSpec($op, $ent) {
        $method = $this->method($op, $ent);
        $spec = [
            'url' => $this->endpoint($op, $ent),
            'method' => $method,
            'headers' => [
                'content-type' => 'application/json',
                'authorization' => 'Bearer ' . $this->options['apikey']
            ],
            'body' => $method === 'GET' ? null : $this->body($op, $ent),
        ];
        return $spec;
    }

    public function Asset($data) {
        return new Asset($this, $data);
    }

    public function Geofence($data) {
        return new Geofence($this, $data);
    }

    public function Room($data) {
        return new Room($this, $data);
    }

    private function required($type, $name, $options) {
        $val = $options[$name] ?? null;
        if (gettype($val) !== $type) {
            throw new Exception("PlantquestSDK: Invalid option: $name=$val: must be of type $type");
        }
    }
}

?>
