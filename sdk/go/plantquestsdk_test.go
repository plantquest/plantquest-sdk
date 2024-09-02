
package plantquest 

import (
  "fmt"
  "testing"
  "net/http"
  "io"
  "strings"
  "reflect"
)

// Mock HTTP Client Transport type.
// For more info, please see: https://pkg.go.dev/net/http#Client
// And: https://pkg.go.dev/net/http#RoundTripper
type fakeService func(*http.Request) (*http.Response, error)

func (s fakeService) RoundTrip(req *http.Request) (*http.Response, error) {
  return s(req)
}

func createHttpClientMock(respData *strings.Reader) *http.Client {
 return &http.Client{
  Transport: fakeService(func(*http.Request) (*http.Response, error) {
    return &http.Response{
      StatusCode: http.StatusOK,
      Header: http.Header{
        "Content-Type": []string{"application/json"},
      },
      Body: io.NopCloser(respData),
    }, nil
  }),
}}

func TestAssetList(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  want := Data{
    Id: "assetf01",
  }

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk :=  Make(options)

  respData := strings.NewReader(fmt.Sprintf(`{"list":[{"id":"assetf01"},
    {"id":"assetf01"}]}`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  entities, err := sdk.Asset().List()
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := entities[0].Data
  if fmt.Sprint(got) != fmt.Sprint(want) {
    t.Errorf("Error getting asset list want %q and got %q", want, got)
  }
}

func TestAssetLoad(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  var want Data
  want.Id = "assetf01"

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk := Make(options)

  respData := strings.NewReader(fmt.Sprintf(`{"id":"assetf01"}`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  data := want
  asset, err := sdk.Asset().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := asset.Data
  if reflect.DeepEqual(got, want) == false {
    t.Errorf("Error getting asset load want %q and got %q", want, got)
  }
}

func TestGeofenceList(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  want := Data{
    Id: "geofencef01",
  }

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk :=  Make(options)

  respData := strings.NewReader(fmt.Sprintf(`{"list":[{"id":"geofencef01"},
    {"id":"geofencef01"}]}`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  entities, err := sdk.Geofence().List()
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := entities[0].Data
  if fmt.Sprint(got) != fmt.Sprint(want) {
    t.Errorf("Error getting geofence list want %q and got %q", want, got)
  }
}

func TestGeofenceLoad(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  var want Data
  want.Id = "geofencef01"

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk := Make(options)

  respData := strings.NewReader(fmt.Sprintf(`{"id":"geofencef01"}`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  data := want
  geofence, err := sdk.Geofence().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := geofence.Data
  if reflect.DeepEqual(got, want) == false {
    t.Errorf("Error getting geofence load want %q and got %q", want, got)
  }
}

func TestRoomList(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  want := Data{
    Id: "roomf01",
  }

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk :=  Make(options)

  respData := strings.NewReader(fmt.Sprintf(`{"list":[{"id":"roomf01"},
    {"id":"roomf01"}]}`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  entities, err := sdk.Room().List()
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := entities[0].Data
  if fmt.Sprint(got) != fmt.Sprint(want) {
    t.Errorf("Error getting room list want %q and got %q", want, got)
  }
}

func TestRoomLoad(t *testing.T) {
  endpoint := "http://test.com"
  apikey := "apikey"
  var want Data
  want.Id = "roomf01"

  var options Options
  options.Apikey = apikey
  options.Endpoint = endpoint
  sdk := Make(options)

  respData := strings.NewReader(fmt.Sprintf(`{"id":"roomf01"}`))
  httpClientMock := createHttpClientMock(respData)
  sdk.httpClient = *httpClientMock

  data := want
  room, err := sdk.Room().Load(data)
  if err != nil {
    t.Errorf("ERR: %q", err)
  }

  got := room.Data
  if reflect.DeepEqual(got, want) == false {
    t.Errorf("Error getting room load want %q and got %q", want, got)
  }
}

