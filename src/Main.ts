
import { cmp, Copy } from 'jostraca'


const Main = cmp(function Main(props: any) {
  const { build } = props
  const { model } = props.ctx$

  const Main_sdk = require(`./${build.name}/Main_${build.name}`)

  Main_sdk['Main_' + build.name]({ model, build })

  Copy({ from: 'tm/' + build.name + '/LICENSE', name: 'LICENSE' })
})


export {
  Main
}
