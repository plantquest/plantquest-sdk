"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAcceptEntity = void 0;
const jostraca_1 = require("jostraca");
const TestAcceptEntity = (0, jostraca_1.cmp)(function TestEntity_go(props) {
    const { entity } = props;
    entity.Name = (0, jostraca_1.camelify)(entity.name);
    (0, jostraca_1.Code)(`
func Test${entity.Name}AcceptLoad(t *testing.T) {
  endpoint := "http://localhost:4010/project01/plant01/stage01"
  apikey := "apikey"

  want := Data {
    Id: "string",
    Name: "string",
    Desc: "string",
  }

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  client := Make(options)

  var data Data
  data.Id = "t01"

  ${entity.name}, err := client.${entity.Name}().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := ${entity.name}.Data
  
  // Todo: add check to all struct fields
  if got.Id != want.Id  {
    t.Errorf("Error getting ${entity.name} accept load want %q and got %q", want.Id, got.Id)
  }

  if got.Name != want.Name  {
    t.Errorf("Error getting ${entity.name} accept load want %q and got %q", want.Name, got.Name)
  }

  if got.Desc != want.Desc  {
    t.Errorf("Error getting ${entity.name} accept load want %q and got %q", want.Desc, got.Desc)
  }
}
`);
});
exports.TestAcceptEntity = TestAcceptEntity;
//# sourceMappingURL=TestAcceptEntity_go.js.map