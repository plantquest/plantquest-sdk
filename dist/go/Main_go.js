"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main_go = void 0;
const jostraca_1 = require("jostraca");
const MainEntity_go_1 = require("./MainEntity_go");
const Test_go_1 = require("./Test_go");
const Main_go = (0, jostraca_1.cmp)(async function Main_go(props) {
    const { build } = props;
    const { model } = props.ctx$;
    const entity = model.main.sdk.entity;
    const options = build.options;
    (0, jostraca_1.Copy)({ from: 'tm/' + build.name + '/.env.example', name: '.env.example' });
    (0, jostraca_1.Copy)({ from: 'tm/' + build.name + '/go.mod', name: 'go.mod' });
    (0, jostraca_1.Copy)({ from: 'tm/' + build.name + '/go.sum', name: 'go.sum' });
    (0, Test_go_1.Test)({ build });
    (0, jostraca_1.File)({ name: model.name + 'sdk.' + build.name }, () => {
        (0, jostraca_1.Code)(`
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
  `);
        (0, jostraca_1.each)(options, (option) => {
            (0, jostraca_1.Code)(`
  ${option.name} ${option.kind.toLowerCase()}
`);
        });
        (0, jostraca_1.Code)(`
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
`);
        (0, jostraca_1.each)(entity, (entity) => {
            (0, MainEntity_go_1.MainEntity)({ model, build, entity });
        });
        (0, jostraca_1.Code)(`
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
`);
    });
});
exports.Main_go = Main_go;
//# sourceMappingURL=Main_go.js.map