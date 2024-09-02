
import { cmp, File, Code } from 'jostraca'


const Entity_go = cmp(function Entity_go(props: any) {
  const { build, entity } = props
  const { model } = props.ctx$

  File({ name: entity.name + '.' + build.name }, () => {

    Code(`
// ${model.Name} ${build.Name} ${entity.Name}

package ${model.name}

import (
  "fmt"
  "encoding/json"
  "io"
  "errors"
  "net/http"
)

type ${entity.name} entity

func (e *${entity.name}) handleResult(op string, res *http.Response,
  handler func(Data) *${entity.name}) (*${entity.name}, error) {
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

  return nil, errors.New(fmt.Sprintf("HTTP-ERROR: %v: ${entity.name}: %v",
    op, status))
}

func (e *${entity.name}) List() ([]*${entity.name}, error) {
  type entityList struct {
    List []Data
  }

  var entities []*${entity.name}

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
      entity := e.sdk().${entity.Name}(entityData)
      entities = append(entities, entity)
    }

    return entities, nil
  }

  return nil, errors.New(fmt.Sprintf("HTTP-ERROR: %v: ${entity.name}: %v",
    op, status))
}

func (e *${entity.name}) Load(data Data) (*${entity.name}, error) {
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

  handler := func(data Data) *${entity.name} {
    e.Data = data
    return e
  }

  return e.handleResult(op, res, handler)
}

func (e *${entity.name}) Save(data Data) (*${entity.name}, error) {
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

  handler := func(data Data) *${entity.name} {
    e.Data = data
    return e
  }

  return e.handleResult(op, res, handler)
}

func (e *${entity.name}) Remove(data Data) (*${entity.name}, error) {
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

  handler := func(data Data) *${entity.name} {
    e.Data = data
    return nil
  }

  return e.handleResult(op, res, handler)
}
`)

  })
})


export {
  Entity_go
}
