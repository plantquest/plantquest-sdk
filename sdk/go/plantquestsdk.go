
// Plantquest Go SDK

package plantquest

import(
  "net/http"
  "encoding/json"
  "fmt"
  "bytes"
)

type Data struct {
  Id string `json:"id"`
  Name string `json:"name"`
  Desc string `json:"desc"`
  Custom map[string]any `json:"custom"`
}

type spec struct {
  url string
  method string
  contentType string
  authorization string
  body *bytes.Buffer
}

type Options struct {
  
  Apikey string

  Endpoint string

}

type plantquest struct {
  options Options
  httpClient http.Client
}

type entity struct {
  def map[string]any
  Data Data
  sdk func () *plantquest
}

func (m *plantquest) Asset(data ...Data) *asset {
  e := new (asset)
  e.sdk = func () *plantquest {return m}
  if data != nil {
    e.Data = data[0]
  }
  e.def = map[string]any{
    "name": "asset",
  }
  return e
}

func (m *plantquest) Geofence(data ...Data) *geofence {
  e := new (geofence)
  e.sdk = func () *plantquest {return m}
  if data != nil {
    e.Data = data[0]
  }
  e.def = map[string]any{
    "name": "geofence",
  }
  return e
}

func (m *plantquest) Room(data ...Data) *room {
  e := new (room)
  e.sdk = func () *plantquest {return m}
  if data != nil {
    e.Data = data[0]
  }
  e.def = map[string]any{
    "name": "room",
  }
  return e
}

func (m *plantquest) method(op string) string {
  operations := map[string]string {
    "create": "POST",
    "save": "PUT",
    "load": "GET",
    "list": "GET",
    "remove": "DELETE",
  }

  return operations[op]
}

func (m *plantquest) endpoint(data Data, def map[string]any) string {
  id := data.Id
  name := def["name"]
  url := fmt.Sprintf("%v/%v", m.options.Endpoint, name)

  if id != "" {
    url += fmt.Sprintf("/%v", id)
  }

  return url
}

func (m *plantquest) body(data Data) ([]byte, error) {
  var msg []byte
  msg, err := json.Marshal(data)
  if err != nil {
    return nil, err
  }
  return msg, nil
}

func (m *plantquest) fetchSpec(op string, data Data, def map[string]any) (spec, error){
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

func Make(options Options) *plantquest {
  sdk := new (plantquest)
  sdk.options = options
  sdk.httpClient = *http.DefaultClient
  return sdk
}
