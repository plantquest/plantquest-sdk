
package plantquest 

import (
  "log"
  "testing"
  "os"

  "github.com/joho/godotenv"
)

func TestQuick(t *testing.T) {
  err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }

  endpoint := os.Getenv("PLANTQUEST_ENDPOINT")
  apikey := os.Getenv("PLANTQUEST_APIKEY")

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk := Make(options)

  data := Data{
    Id: "D30D5460-FCB7-4280-8EDA-EC041F6626EC",
  }
  asset, err := sdk.Asset().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  log.Println(asset.Data)
}
