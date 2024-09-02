
import { cmp, File, Code } from 'jostraca'


const Quick = cmp(function Quick_go(props: any) {
  const { build } = props
  const { model } = props.ctx$

  File({ name: 'quick_test.' + build.name }, () => {

    Code(`
package ${model.name} 

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

  endpoint := os.Getenv("${model.NAME}_ENDPOINT")
  apikey := os.Getenv("${model.NAME}_APIKEY")

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
`)

  })
})


export {
  Quick
}

