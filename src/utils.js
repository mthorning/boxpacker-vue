module.exports = {

  newID: (function () {
    let count = 0
    return function () {
      count++
      return count.toString()
    }
  })(),

  formatStr (str) {
    const words = str.split(' ')
    return words.map(word => {
      const arr = word.split('')
      const replacement = arr[0].toUpperCase()
      arr.splice(0, 1, replacement)
      return arr.join('')
    }).join(' ')
  }

}
