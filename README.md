[![npm](https://nodei.co/npm/unist-to-u.png)](https://npmjs.com/package/unist-to-u)

# unist-to-u

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Convert [Unist] trees to [unist-builder] notation.

[unist]:  https://github.com/wooorm/unist
[unist-builder]: https://github.com/eush77/unist-builder

[travis]: https://travis-ci.org/eush77/unist-to-u
[travis-badge]: https://travis-ci.org/eush77/unist-to-u.svg?branch=master
[david]: https://david-dm.org/eush77/unist-to-u
[david-badge]: https://david-dm.org/eush77/unist-to-u.png

## Example

```js
var toU = require('unist-to-u'),
    escodegen = require('escodegen');

var estree = toU({
  "type": "root",
  "children": [
    {
      "type": "subtree",
      "id": 1
    },
    {
      "type": "subtree",
      "id": 2,
      "children": [
        {
          "type": "node",
          "children": [
            {
              "type": "leaf",
              "value": "leaf-1"
            },
            {
              "type": "leaf",
              "value": "leaf-2"
            }
          ]
        },
        {
          "type": "leaf",
          "id": 3,
          "value": "leaf-3"
        }
      ]
    }
  ]
});

escodegen.generate(estree)
```

results in the following code:

```js
u('root', [
    u('subtree', { id: 1 }),
    u('subtree', { id: 2 }, [
        u('node', [
            u('leaf', 'leaf-1'),
            u('leaf', 'leaf-2')
        ]),
        u('leaf', { id: 3 }, 'leaf-3')
    ])
])
```

## API

#### `toU(ast, [opts])`

Converts `ast` to [unist-builder] notation. Returns JavaScript AST in [ESTree] format.

To generate actual JavaScript code from AST, use one of the existing code generators, e.g. [Escodegen].

##### `opts.builder`

Type: `String`<br>
Default: `"u"`

Builder function name.

[estree]: https://github.com/estree/estree
[escodegen]: https://github.com/estools/escodegen

## Install

```
npm install unist-to-u
```

## License

MIT
