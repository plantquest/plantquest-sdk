"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMain = void 0;
const jostraca_1 = require("jostraca");
const TestEntity_go_1 = require("./TestEntity_go");
const TestMain = (0, jostraca_1.cmp)(function TestMain_js(props) {
    const { build } = props;
    const { model } = props.ctx$;
    (0, jostraca_1.File)({ name: model.name + 'sdk_test.' + build.name }, () => {
        (0, jostraca_1.Code)(`
package ${model.name} 

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
`);
        (0, jostraca_1.each)(model.main.sdk.entity, (entity) => {
            (0, TestEntity_go_1.TestEntity)({ model, build, entity });
        });
        (0, jostraca_1.Code)(`
`);
    });
});
exports.TestMain = TestMain;
//# sourceMappingURL=TestMain_go.js.map