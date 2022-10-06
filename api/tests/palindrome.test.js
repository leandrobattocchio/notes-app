const { palindrome } = require('../utils/for_testing')

describe('palindrome', () => {
  test('palindrome of leandro', () => {
    expect(palindrome('leandro')).toBe('ordnael')
  })
})
