
import { cmp, each, File, Code, Copy } from 'jostraca'

import { MainEntity } from './MainEntity_go'
import { Test } from './Test_go'

const Main_go = cmp(async function Main_go(props: any) {
  const { build } = props
  const { model } = props.ctx$

  const entity = model.main.sdk.entity
  const options = build.options

  Copy({ from: 'tm/' + build.name + '/.env.example', name: '.env.example' })
  Copy({ from: 'tm/' + build.name + '/go.mod', name: 'go.mod' })
  Copy({ from: 'tm/' + build.name + '/go.sum', name: 'go.sum' })
  Test({ build })
  File({ name: model.name + 'sdk.' + build.name }, () => {

    Code(`
// ${model.Name} ${build.Name} SDK

package ${model.name}

import(
  "net/http"
  "encoding/json"
  "fmt"
  "bytes"
)

type Data struct {
  Id string \`json:"id"\`
  Name string \`json:"name"\`
  Desc string \`json:"desc"\`
  Custom map[string]any \`json:"custom"\`
}

type spec struct {
  url string
  method string
  contentType string
  authorization string
  body *bytes.Buffer
}

type Options struct {
  `)
    each(options, (option: any) => {
      Code(`
  ${option.name} ${option.kind.toLowerCase()}
`)
    })
    Code(`
}

type ${model.name} struct {
  options Options
  httpClient http.Client
}

type entity struct {
  def map[string]any
  Data Data
  sdk func () *${model.name}
}
`)

    each(entity, (entity: any) => {
      MainEntity({ model, build, entity })
    })

    Code(`
func (m *${model.name}) method(op string) string {
  operations := map[string]string {
    "create": "POST",
    "save": "PUT",
    "load": "GET",
    "list": "GET",
    "remove": "DELETE",
  }

  return operations[op]
}

func (m *${model.name}) endpoint(data Data, def map[string]any) string {
  id := data.Id
  name := def["name"]
  url := fmt.Sprintf("%v/%v", m.options.Endpoint, name)

  if id != "" {
    url += fmt.Sprintf("/%v", id)
  }

  return url
}

func (m *${model.name}) body(data Data) ([]byte, error) {
  var msg []byte
  msg, err := json.Marshal(data)
  if err != nil {
    return nil, err
  }
  return msg, nil
}

func (m *${model.name}) fetchSpec(op string, data Data, def map[string]any) (spec, error){
  method := m.method(op)
  body := bytes.NewBuffer([]byte{})

  if method != "GET" {
    parsedBody, err := m.body(data)
    if err != nil {
      return spec{}, err
    }
    body = bytes.NewBuffer(parsedBody)
  }

  spec := spec{
    url: m.endpoint(data, def),
    method: method,
    contentType: "application/json",
    authorization: fmt.Sprintf("Bearer %v", m.options.Apikey),
    body: body,
  }
  return spec, nil
}

func Make(options Options) *${model.name} {
  sdk := new (${model.name})
  sdk.options = options
  sdk.httpClient = *http.DefaultClient
  return sdk
}
`)
  })
})


export {
  Main_go
}
