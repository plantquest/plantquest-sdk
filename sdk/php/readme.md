
# Plantquest PHP SDK

This SDK allows you to interact with the Plantquest API using PHP. It provides functionality for managing assets, geofences, and rooms.

## Requirements

- PHP 7.4 or higher
- Composer
- PHP extensions: `curl`, `json`, `mbstring`

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/plantquest-php-sdk.git
   cd plantquest-php-sdk
   ```

2. **Install Dependencies:**
   Make sure [Composer](https://getcomposer.org/) is installed, then run:
   ```bash
   composer install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the project root with the following contents:
   ```dotenv
   API_KEY=your_api_key_here
   API_ENDPOINT=https://api.plantquest.com
   ```

## Usage

Here's a quick example of how to use the SDK:

```php
require 'vendor/autoload.php';

use YourNamespace\PlantquestSDK;
use YourNamespace\Asset;
use YourNamespace\Geofence;
use YourNamespace\Room;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Initialize the SDK
$options = [
    'apikey' => $_ENV['API_KEY'],
    'endpoint' => $_ENV['API_ENDPOINT']
];
$sdk = new PlantquestSDK($options);

// Working with an Asset
$asset = new Asset($sdk);
$asset->save(['name' => 'New Asset']);
```

## Testing

To run the tests, make sure you have PHPUnit installed and configured:

1. **Run Tests:**
   ```bash
   ./vendor/bin/phpunit
   ```

This will execute the test suite and provide output on the test results.