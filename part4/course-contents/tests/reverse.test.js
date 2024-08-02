const {test, describe} = require(`node:test`)
const assert = require(`node:assert`)

const reverse = require(`../utils/for_testing`).reverse
const average = require(`../utils/for_testing`).average

describe('reverse',() => {
    test('reverse of kapil', () => {
        const result = reverse(`kapil`)
        assert.strictEqual(result,`lipak`)
    })
    
    test(`reverse of react`, () => {
        const result =  reverse(`react`)
        assert.strictEqual(result,`tcaer`)
    })
})

describe(`average`, () => {
    test('average of  [10,15,30]', ()=> {
        const result = average([10,15,20])
        assert.strictEqual(result,15)
})
    })


