const { toArray, max, take } = require('rxjs/operators')

const { inputReader, sumPerElf } = require('./inputReader')

const calories = inputReader('./fixtures/input')

calories.pipe(sumPerElf(), max(), take(1)).subscribe((values) => {
  console.log('AOC 1-1: ', values)
})

calories.pipe(sumPerElf(), toArray()).subscribe((values) => {
  const sorted = values.sort((a, b) => b - a)
  const [a, b, c, ...rest] = sorted
  console.log('AOC 1-2: ', a + b + c)
})
