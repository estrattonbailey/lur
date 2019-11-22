# lur

Tiny naive LRU cache. **250 bytes gzipped.**

### Install

```
npm i lur --save
```

### Naive?

It uses an array of tuples instead of a linked list or other structures like
`Map`. Basically, it's a much simpler implemenation, without a few of the common
methods like `peek`.

# Usage

```javascript
import lru from "lur";

const cache = lru(3); // max entities

cache.set("a", "1");
cache.set("b", "2");
cache.set("c", "3");

cache.get("a");

cache.set("d", "4");

cache.keys; // => [ 'd', 'a', 'c' ]
cache.values; // => [ '4', '1', '3' ]
cache.length; // => 3
cache.has("a"); // => true

cache.delete("a");
cache.values; // => [ '4', '3' ]

cache.clear();

cache.values; // => []
```

Of course, keys and values aren't limited to strings, though keep in mind
that _`lur` performs strict shallow equality checks_:

```javascript
const key = { a: 1 };
const value = { b: 2 };

cache.set(key, value);

cache.get(key); // => { b: 2 }
```

### License

MIT License © [Eric Bailey](https://estrattonbailey.com)
