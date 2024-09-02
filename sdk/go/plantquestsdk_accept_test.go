
package plantquest

import (
  "testing"
)
         
func TestAssetAcceptLoad(t *testing.T) {
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

  asset, err := client.Asset().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := asset.Data
  
  // Todo: add check to all struct fields
  if got.Id != want.Id  {
    t.Errorf("Error getting asset accept load want %q and got %q", want.Id, got.Id)
  }

  if got.Name != want.Name  {
    t.Errorf("Error getting asset accept load want %q and got %q", want.Name, got.Name)
  }

  if got.Desc != want.Desc  {
    t.Errorf("Error getting asset accept load want %q and got %q", want.Desc, got.Desc)
  }
}

func TestGeofenceAcceptLoad(t *testing.T) {
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

  geofence, err := client.Geofence().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := geofence.Data
  
  // Todo: add check to all struct fields
  if got.Id != want.Id  {
    t.Errorf("Error getting geofence accept load want %q and got %q", want.Id, got.Id)
  }

  if got.Name != want.Name  {
    t.Errorf("Error getting geofence accept load want %q and got %q", want.Name, got.Name)
  }

  if got.Desc != want.Desc  {
    t.Errorf("Error getting geofence accept load want %q and got %q", want.Desc, got.Desc)
  }
}

func TestRoomAcceptLoad(t *testing.T) {
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

  room, err := client.Room().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := room.Data
  
  // Todo: add check to all struct fields
  if got.Id != want.Id  {
    t.Errorf("Error getting room accept load want %q and got %q", want.Id, got.Id)
  }

  if got.Name != want.Name  {
    t.Errorf("Error getting room accept load want %q and got %q", want.Name, got.Name)
  }

  if got.Desc != want.Desc  {
    t.Errorf("Error getting room accept load want %q and got %q", want.Desc, got.Desc)
  }
}
