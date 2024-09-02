
import { cmp, File, Code, Folder } from 'jostraca'

import { Quick_php as Quick } from './Quick_php'
import { TestMain } from './TestMain_php'


const Test = cmp(function Test_php(props: any) {
  const { build } = props

  Folder({ name: 'test' }, () => {

    Quick({ build })
    TestMain({ build })
  })
})


export {
  Test
}
