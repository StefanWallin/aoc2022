const { Observable, Subject } = require('rxjs')
const { tap, bufferWhen } = require('rxjs/operators')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

const inputReader = (filename) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve('./', filename)),
  })
  const obs = new Observable((observer) => {
    rl.on('line', (val) => {
      const emittableValue = val ? parseInt(val, 10) : undefined
      observer.next(emittableValue)
    }),
      rl.on('error', (err) => observer.error(err)),
      rl.on('close', (complete) => observer.complete(complete))
  })

  return obs
}

const sumPerElf = () => {
  return (calories) =>
    new Observable((elfs) => {
      let accumulator = 0
      calories.subscribe({
        next: (value) => {
          if (value) {
            accumulator += value
          } else {
            elfs.next(accumulator)
            accumulator = 0
          }
        },
        error: (err) => elfs.error(err),
        complete: () => {
          elfs.next(accumulator)
          elfs.complete()
        },
      })
    })
}

module.exports = {
  inputReader,
  sumPerElf,
}
