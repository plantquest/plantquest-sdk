
import { names, cmp, each, Project, Folder } from 'jostraca'

import { Readme } from './Readme'
import { Main } from './Main'
import { Entity } from './Entity'


const Root = cmp(function Root(props: any) {
  const { model, ctx$ } = props

  names(model, model.name)

  // console.dir(model, { depth: null })

  ctx$.model = model

  const build = model.main.sdk.build
  const entity = model.main.sdk.entity

  console.log('PROJECT-b', model.name, ctx$.meta.spec.build.id)

  Project({}, () => {

    each(build, (build: any) => {
      names(build, build.name)
      console.log('BUILD', build.name)

      Folder({ name: build.name }, () => {

        each(entity, (entity: any) => {
          names(entity, entity.name)
          console.log('ENTITY', entity.name)

          Entity({ build, entity })
        })

        Main({ build })

        Readme({ build })
      })
    })
  })
})


export {
  Root
}

