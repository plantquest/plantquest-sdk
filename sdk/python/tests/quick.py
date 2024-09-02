

from pathlib import Path
import sys
import json

from dotenv import dotenv_values

path_root = Path(__file__).parents[1]
sys.path.append(str(path_root))

from src import plantquest_sdk

from Fetch import fetch

config = dotenv_values("../../.env.local")


print("config: ", config)


print(plantquest_sdk.PlantquestSDK)
print(dir(plantquest_sdk))


if __name__ == "__main__":
    client = plantquest_sdk.PlantquestSDK.make({
        'endpoint': config['PLANTQUEST_ENDPOINT'],
        'apikey': config['PLANTQUEST_APIKEY'],
        'fetch': fetch
    })

    out = client.Room().load({"id": "CF49B47C-317B-4387-83C3-4A23715B1C45"})
    print("Geofence.load", out)


