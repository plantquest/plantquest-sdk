
import { cmp, camelify, Code } from 'jostraca'


const TestAcceptEntity = cmp(function TestEntity_js(props: any) {
  const { entity } = props

  entity.Name = camelify(entity.name)

  Code(`
  test('${entity.name}-load', async ()=>{
    const client = makeClient()
    const out = await client.${entity.Name}().load({id:'t01'})
    console.log('load', out)

    // equal(out.status, 200, 'Expected status code 200');

    // Define the expected format
    const expectedFormat = {
      id: 'string',
      name: 'string',
      desc: 'string',
      custom: 'object',
    };

    const keys = Object.keys(expectedFormat);
    keys.forEach((key) => {
      equal(typeof out.data[key], expectedFormat[key], 'Expected ' + key + ' to be a ' + expectedFormat[key]);
    })

  })

`);
})


export {
  TestAcceptEntity
}
