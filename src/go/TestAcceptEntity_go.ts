
import { cmp, camelify, Code } from 'jostraca'


const TestAcceptEntity = cmp(function TestEntity_go(props: any) {
  const { entity } = props

  entity.Name = camelify(entity.name)

  Code(`
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
})


export {
  TestAcceptEntity
}
