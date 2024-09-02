"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const jostraca_1 = require("jostraca");
const TestEntity = (0, jostraca_1.cmp)(function TestEntity_js(props) {
    const { entity } = props;
    entity.Name = (0, jostraca_1.camelify)(entity.name);
    (0, jostraca_1.Code)(`
func Test${entity.Name}List(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  want := Data{
    Id: "${entity.name}f01",
  }

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk :=  Make(options)

  respData := strings.NewReader(fmt.Sprintf(\`{"list":[{"id":"${entity.name}f01"},
    {"id":"${entity.name}f01"}]}\`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  entities, err := sdk.${entity.Name}().List()
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := entities[0].Data
  if fmt.Sprint(got) != fmt.Sprint(want) {
    t.Errorf("Error getting ${entity.name} list want %q and got %q", want, got)
  }
}

func Test${entity.Name}Load(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  var want Data
  want.Id = "${entity.name}f01"

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk := Make(options)

  respData := strings.NewReader(fmt.Sprintf(\`{"id":"${entity.name}f01"}\`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  data := want
  ${entity.name}, err := sdk.${entity.Name}().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := ${entity.name}.Data
  if reflect.DeepEqual(got, want) == false {
    t.Errorf("Error getting ${entity.name} load want %q and got %q", want, got)
  }
}
`);
});
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity_go.js.map