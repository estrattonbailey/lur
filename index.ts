export default function lru<Key, Value>(limit = Infinity) {
  let cache: [Key, Value][] = [];

  return {
    set(key: Key, value: Value) {
      let exists = false;

      for (let i = 0; i < cache.length; i++) {
        const ent = cache[i];
        if (ent[0] === key) {
          exists = true;
          ent[1] = value;
          break;
        }
      }

      if (!exists) {
        cache.unshift([key, value]);
      }

      if (cache.length > limit) {
        cache.pop();
      }
    },
    get(key: Key): Value {
      for (let i = 0; i < cache.length; i++) {
        const ent = cache[i];
        if (ent[0] === key) {
          cache.splice(i, 1);
          cache.unshift(ent);
          return ent[1];
        }
      }
    },
    delete(key: Key) {
      for (let i = 0; i < cache.length; i++) {
        const ent = cache[i];
        if (ent[0] === key) cache.splice(i, 1);
      }
    },
    has(key: Key): boolean {
      for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === key) return true;
      }
      return false;
    },
    clear() {
      cache = []
    },
    get keys(): Key[] {
      return cache.map(ent => ent[0]);
    },
    get values(): Value[] {
      return cache.map(ent => ent[1]);
    },
    get length(): number {
      return cache.length;
    },
  };
}
