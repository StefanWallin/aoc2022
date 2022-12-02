const { toArray, max, take } = require('rxjs/operators')

const { inputReader, sumPerElf } = require('./inputReader')

test('it should emit one marble for each line in the test file ', (done) => {
  const calories = inputReader('./fixtures/testinput')
  const expectedValues = [
    1000,
    2000,
    3000,
    ,
    4000,
    ,
    5000,
    6000,
    ,
    7000,
    8000,
    9000,
    ,
    10000,
  ]
  let sub
  try {
    sub = calories.pipe(toArray()).subscribe((values) => {
      expect(values).toEqual(expectedValues)
      done()
    })
  } catch (err) {
    console.error(err)
    done()
  } finally {
    sub.unsubscribe()
    done()
  }
})

test('it should collect all the values per elf and sum them', (done) => {
  const calories = inputReader('./fixtures/testinput')
  const expectedValues = [6000, 4000, 11000, 24000, 10000]
  calories.pipe(sumPerElf(), toArray()).subscribe((values) => {
    expect(values).toEqual(expectedValues)
    done()
  })
})

test('it should find the calories of the elf with the most calories', (done) => {
  const calories = inputReader('./fixtures/testinput')
  const expectedValues = 24000
  calories.pipe(sumPerElf(), max(), take(1)).subscribe((values) => {
    expect(values).toEqual(expectedValues)
    done()
  })
})
