const { average } = require('../utils/for_testing')

describe('averages', () => {
  test('average of [1, 3, 5, 7]', () => {
    expect(average([1, 3, 5, 7])).toBe(4)
  })

  test('average of [4, 7, 25, 3]', () => {
    expect(average([4, 7, 25, 3])).toBe(9.75)
  })
})
