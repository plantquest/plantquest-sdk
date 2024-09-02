
// Plantquest Go Asset

package plantquest

import (
  "fmt"
  "encoding/json"
  "io"
  "errors"
  "net/http"
)

type asset entity

func (e *asset) handleResult(op string, res *http.Response,
  handler func(Data) *asset) (*asset, error) {
  var result Data
  status := res.StatusCode

  if status == 200 {
    resBody, err := io.ReadAll(res.Body)
    if err != nil {
      return nil, err
    }

    if err = json.Unmarshal(resBody, &result); err != nil {
      return nil, err
    }
    return handler(result), nil
  }

  return nil, errors.New(fmt.Sprintf("HTTP-ERROR: %v: asset: %v",
    op, status))
}

func (e *asset) List() ([]*asset, error) {
  type entityList struct {
    List []Data
  }

  var entities []*asset

  op := "list"
  spec, err := e.sdk().fetchSpec(op, e.Data, e.def)
  if err != nil {
    return nil, err
  }

  req, err := http.NewRequest(spec.method, spec.url, spec.body)
  if err != nil {
    return nil, err
  }

  req.Header.Set("Content-Type", spec.contentType)
  req.Header.Set("Authorization", spec.authorization)

  res, err := e.sdk().httpClient.Do(req)
  if err != nil {
    return nil, err
  }
  defer res.Body.Close()

  status := res.StatusCode

  if status == 200 {
    resBody, err := io.ReadAll(res.Body)
    if err != nil {
      return nil, err
    }

    var entityList entityList
    if err = json.Unmarshal(resBody, &entityList); err != nil {
      return nil, err
    }

    for _, entityData := range entityList.List {
      entity := e.sdk().Asset(entityData)
      entities = append(entities, entity)
    }

    return entities, nil
  }

  return nil, errors.New(fmt.Sprintf("HTTP-ERROR: %v: asset: %v",
    op, status))
}

func (e *asset) Load(data Data) (*asset, error) {
  op := "load"
  e.Data = data
  spec, err := e.sdk().fetchSpec(op, e.Data, e.def)
  if err != nil {
    return nil, err
  }

  req, err := http.NewRequest(spec.method, spec.url, spec.body)
  if err != nil {
    return nil, err
  }

  req.Header.Set("Content-Type", spec.contentType)
  req.Header.Set("Authorization", spec.authorization)

  res, err := e.sdk().httpClient.Do(req)
  if err != nil {
    return nil, err
  }
  defer res.Body.Close()

  handler := func(data Data) *asset {
    e.Data = data
    return e
  }

  return e.handleResult(op, res, handler)
}

func (e *asset) Save(data Data) (*asset, error) {
  op := "save"
  e.Data = data
  spec, err := e.sdk().fetchSpec(op, e.Data, e.def)
  if err != nil {
    return nil, err
  }

  req, err := http.NewRequest(spec.method, spec.url, spec.body)
  if err != nil {
    return nil, err
  }

  req.Header.Set("Content-Type", spec.contentType)
  req.Header.Set("Authorization", spec.authorization)

  res, err := e.sdk().httpClient.Do(req)
  if err != nil {
    return nil, err
  }
  defer res.Body.Close()

  handler := func(data Data) *asset {
    e.Data = data
    return e
  }

  return e.handleResult(op, res, handler)
}

func (e *asset) Remove(data Data) (*asset, error) {
  op := "remove"
  e.Data = data
  spec, err := e.sdk().fetchSpec(op, e.Data, e.def)
  if err != nil {
    return nil, err
  }

  req, err := http.NewRequest(spec.method, spec.url, spec.body)
  if err != nil {
    return nil, err
  }

  req.Header.Set("Content-Type", spec.contentType)
  req.Header.Set("Authorization", spec.authorization)

  res, err := e.sdk().httpClient.Do(req)
  if err != nil {
    return nil, err
  }
  defer res.Body.Close()

  handler := func(data Data) *asset {
    e.Data = data
    return nil
  }

  return e.handleResult(op, res, handler)
}
