import test from 'ava'
import lru from './index'

test('works @ 3', async t => {
  const cache = lru(3)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')

  cache.get('a')

  cache.set('d', 'd')

  t.is(cache.values[0], 'd')
  t.is(cache.length, 3)
})

test('works @ 5', async t => {
  const cache = lru(5)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')
  cache.set('d', 'd')
  cache.set('e', 'e')

  cache.get('a')

  cache.set('f', 'f')

  t.is(cache.values[0], 'f')
  t.is(cache.values[1], 'a')
  t.is(cache.values[2], 'e')
  t.is(cache.length, 5)
})

test('delete', async t => {
  const cache = lru(3)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')

  cache.delete('a')

  t.is(cache.length, 2)
})

test('has', async t => {
  const cache = lru(3)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')

  t.is(cache.has('a'), true)
})

test('non-strings', async t => {
  const cache = lru(3)

  const a = { a: 1 }
  const b = { a: 1 }
  const c = { a: 1 }

  cache.set(a, 'a')
  cache.set(b, 'b')
  cache.set(c, 'c')

  t.is(cache.has(a), true)
})

test('updates duplicate keys', async t => {
  const cache = lru(3)

  const a = { a: 1 }
  const b = { a: 1 }

  cache.set(a, 'a1')
  cache.set(a, 'a2')
  cache.set(b, 'b1')
  cache.set(b, 'b2')

  t.is(cache.length, 2)
  t.is(cache.get(a), 'a2')
  t.is(cache.get(b), 'b2')
})

test('keys', async t => {
  const cache = lru(3)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')

  t.deepEqual(cache.keys, ['c', 'b', 'a'])
})

test('values', async t => {
  const cache = lru(3)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')

  t.deepEqual(cache.keys, ['c', 'b', 'a'])
})

test('clear', async t => {
  const cache = lru(3)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')

  cache.clear()

  t.is(cache.length, 0)
})

test('serialize', async t => {
  const cache = lru(3)

  cache.set('a', 'a')
  cache.set('b', 'b')
  cache.set('c', 'c')

  const obj = cache.serialize()

  t.is(obj.a, 'a')
})

test('initialCache', async t => {
  const cache = lru(3, {
    a: 'a',
    b: 'b',
    c: 'c'
  })

  t.deepEqual(cache.keys, ['a', 'b', 'c'])
})
