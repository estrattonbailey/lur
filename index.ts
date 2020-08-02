export default function lru<Key = any, Value = any> (
  limit = Infinity,
  initialCache?: { [k: string]: any }
) {
  let cache: [Key, Value][] = initialCache
    ? Object.keys(initialCache).reduce((c, k) => {
        c.push([k, initialCache[k]])
        return c
      }, [])
    : []

  const keys = () => cache.map(ent => ent[0])
  const values = () => cache.map(ent => ent[1])

  return {
    set (key: Key, value: Value) {
      let exists = false

      for (let i = 0; i < cache.length; i++) {
        const ent = cache[i]
        if (ent[0] === key) {
          exists = true
          ent[1] = value
          break
        }
      }

      if (!exists) {
        cache.unshift([key, value])
      }

      if (cache.length > limit) {
        cache.pop()
      }
    },
    get (key: Key): Value {
      for (let i = 0; i < cache.length; i++) {
        const ent = cache[i]
        if (ent[0] === key) {
          cache.splice(i, 1)
          cache.unshift(ent)
          return ent[1]
        }
      }
    },
    delete (key: Key) {
      for (let i = 0; i < cache.length; i++) {
        const ent = cache[i]
        if (ent[0] === key) cache.splice(i, 1)
      }
    },
    has (key: Key): boolean {
      for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === key) return true
      }
      return false
    },
    clear () {
      cache = []
    },
    serialize () {
      return keys().reduce((data, k) => {
        return typeof k === 'string'
          ? {
              ...data,
              [k]: this.get(k)
            }
          : data
      }, {} as { [k: string]: any })
    },
    get keys (): Key[] {
      return keys()
    },
    get values (): Value[] {
      return values()
    },
    get length (): number {
      return cache.length
    }
  }
}
