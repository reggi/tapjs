# @tapjs/intercept

A default tap plugin for doing object/global property/method
interception and observing.

## Usage

```js
import t from 'tap'

const functionThatLogs = (n: number) => {
  console.log('the number is', n)
}

t.test('some child test', t => {
  // track console.log calls
  const results = t.capture(console, 'log')
  functionThatLogs(10)
  functionThatLogs(5)
  // results() returns the list of what was called, and resets
  // the store.
  t.same(results(), [
    { args: ['the number is', 10], returned: undefined },
    { args: ['the number is', 5], returned: undefined },
  ])
  functionThatLogs(1)
  t.same(results(), [{ args: ['the number is', 1], returned: undefined }])
  // when the test ends, the original is restored
  t.end()
})

t.test('capture with an implementation', t => {
  const results = t.capture(console, 'log', () => {
    throw new Error('thrown from stub')
  })
  t.throws(() => {
    functionThatLogs(3)
  }, { message: 'thrown from stub' })
  t.same(results(), { args: ['the number is', 3], threw: true })
  t.end()
})

t.test('capture and still call the function', t => {
  // to do this, we just pass the original in as the third arg
  const results = t.capture(console, 'log', console.log)
  // actually logs to the console
  functionThatLogs(1)
  t.same(results(), [{ args: ['the number is', 1], returned: undefined }])
  t.end()
})

t.test('intercept a property set/get', t => {
  // the last arg is a propertyDescriptor, but configurable: true
  // forced on it even if not provided, so that we can restore
  // it at the end of the test.
  // If a value is provided, then we still actually set to a
  // setter/getter so that we can track accesses.
  const results = t.intercept(process, 'version', { value: '1.2.3' })
  t.equal(process.version, '1.2.3')
  process.version = '2.4.6'
  // we didn't make it writable, so this didn't do anything.
  t.equal(process.version, '1.2.3')
  t.same(results(), [
    { type: 'get', value: '1.2.3', success: true },
    { type: 'set', value: '2.4.6', success: false },
    { type: 'get', value: '1.2.3', success: true },
  ])
})
```

## API

- `Type ResultsFunction` A function that returns data about the
  intercepted calls, and resets the tracking array.
  `results.restore()` will restore the method to its original
  state.

- `t.capture(obj, method, implementation = () => {}): ResultFunction`

    Replaces `obj[method]` with the supplied implementation.

    The `results()` method will return an array of objects with
    an `args` array, an `at` CallSiteLike object, and either
    `threw: true` or `returned: <value>`.

    If `t.teardown()` is available (ie, if the
    `@tapjs/core/plugin/after` plugin is not disabled) then it
    will be automatically restored on test teardown.  Otherwise,
    `results.restore()` must be called to restore the original
    method.