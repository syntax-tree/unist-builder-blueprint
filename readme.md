# unist-builder-blueprint

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unist**][unist] utility to transform [*trees*][tree] to [`unist-builder`][u]
notation.

## Install

[npm][]:

```sh
npm install unist-builder-blueprint
```

## Use

```js
var escodegen = require('escodegen')
var toU = require('unist-builder-blueprint')

var tree = {
  type: 'root',
  children: [
    {type: 'subtree', id: 1},
    {
      type: 'subtree',
      id: 2,
      children: [
        {
          type: 'node',
          children: [
            {type: 'leaf', value: 'leaf 1'},
            {type: 'leaf', value: 'leaf 2'}
          ]
        },
        {type: 'leaf', id: 3, value: 'leaf 3'},
        {type: 'void', id: 4}
      ]
    }
  ]
}

var estree = toU(tree)

console.log(escodegen.generate(estree, {format: {indent: {style: '  '}}}))
```

Yields:

```js
u('root', [
  u('subtree', { id: 1 }),
  u('subtree', { id: 2 }, [
    u('node', [
      u('leaf', 'leaf 1'),
      u('leaf', 'leaf 2')
    ]),
    u('leaf', { id: 3 }, 'leaf 3'),
    u('void', { id: 4 })
  ])
])
```

## API

#### `toU(tree[, options])`

Transform the given [*tree*][tree] to [`unist-builder`][u] notation.

###### Parameters

*   `tree` ([`Node`][node])
    — [**unist**][unist] [*tree*][tree] to transform
*   `options.builder` (`string`, default: `'u'`)
    — Identifier to use as the callee of the [`CallExpression`][call-expression]

###### Returns

[`ESTreeCallExpression`][call-expression].

To generate actual JavaScript code from the result, use one of the existing code
generators, such as [`escodegen`][escodegen].

## Related

*   [`unist-builder-blueprint-cli`](https://github.com/syntax-tree/unist-builder-blueprint-cli)
    — CLI for this module
*   [`unist-builder`][u]
    — Create a new trees with a nice syntax
*   [`hastscript`](https://github.com/syntax-tree/hastscript)
    — Create [hast][] trees
*   [`xastscript`](https://github.com/syntax-tree/xastscript)
    — Create [xast][] trees

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © Eugene Sharygin

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-builder-blueprint.svg

[build]: https://travis-ci.org/syntax-tree/unist-builder-blueprint

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-builder-blueprint.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-builder-blueprint

[downloads-badge]: https://img.shields.io/npm/dm/unist-builder-blueprint.svg

[downloads]: https://www.npmjs.com/package/unist-builder-blueprint

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[tree]: https://github.com/syntax-tree/unist#tree

[hast]: https://github.com/syntax-tree/hast

[xast]: https://github.com/syntax-tree/xast

[u]: https://github.com/syntax-tree/unist-builder

[escodegen]: https://github.com/estools/escodegen

[call-expression]: https://github.com/estree/estree/blob/HEAD/es5.md#callexpression
