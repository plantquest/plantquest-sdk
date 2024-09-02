
import { cmp } from 'jostraca'


const Entity = cmp(function Entity(props: any) {
  const { build, entity } = props

  const Entity_sdk = require(`./${build.name}/Entity_${build.name}`)

  Entity_sdk['Entity_' + build.name]({ build, entity })
})


export {
  Entity
}
