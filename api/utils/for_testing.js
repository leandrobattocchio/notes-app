function palindrome (string) {
  return string
    .split('')
    .reverse()
    .join('')
}

function average (numbers) {
  let sum = 0
  numbers.forEach(element => {
    sum += element
  })
  return sum / numbers.length
}

module.exports = {
  palindrome,
  average
}
