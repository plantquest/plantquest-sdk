
import { cmp, each, File, Code } from 'jostraca'

import { TestAcceptEntity } from './TestAcceptEntity_go'


const TestAccept = cmp(function TestMain_go(props: any) {
  const { build } = props
  const { model } = props.ctx$


  File({ name: model.name + 'sdk_accept_test.' + build.name }, () => {

    Code(`
package ${model.name}

import (
  "testing"
)
         `)

    each(model.main.sdk.entity, (entity: any) => {
      TestAcceptEntity({ model, build, entity })
    })

  })
})


export {
  TestAccept
}

