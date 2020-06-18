'use strict'

var test = require('tape')
var u = require('unist-builder')
var acorn = require('acorn')
var generate = require('escodegen').generate
var toU = require('.')

test.Test.prototype.checkU = checkU

test('unist-builder-blueprint', function (t) {
  t.checkU(function () {
    return u('rule')
  }, 'type only (void)')

  t.checkU(function () {
    return u('text', 'foo')
  }, 'type and value (literal)')

  t.checkU(function () {
    return u('node', [])
  }, 'type and empty children (parent, leaf)')

  t.checkU(function () {
    return u('node', [u('text', 'bar')])
  }, 'type and children (parent, branch)')

  t.checkU(function () {
    return u('root', {childIndex: undefined, leaf: false}, [
      u('node', {leaf: false, childIndex: 0}, [
        u('text', {childIndex: 0, leaf: true, raw: 'Foo'}, 'foo')
      ]),
      u('text', {childIndex: 1, leaf: true, raw: ' bar'}, 'bar')
    ])
  }, 'props')

  t.checkU(
    u('node', {
      array: [1, 2, 3],
      object: {
        foo: 'bar',
        level2: [Object.create(null), String.prototype]
      }
    }),
    function () {
      return u('node', {
        array: [1, 2, 3],
        object: {foo: 'bar', level2: [{}, {}]}
      })
    },
    'composites'
  )

  t.checkU(function () {
    return u('node', {
      position: {
        start: {line: 1, column: 1},
        end: {line: 100500, column: 80, offset: 77},
        indent: [1, 2, 3]
      }
    })
  }, 'position')

  t.checkU(
    u('node', {
      data: {
        undefined: undefined,
        true: true,
        false: false,
        null: null,
        number: 1,
        string: ''
      },
      undefined: undefined,
      true: true,
      false: false,
      null: null,
      number: 1,
      string: ''
    }),
    function () {
      return u('node', {
        data: {
          undefined: undefined,
          true: true,
          false: false,
          null: null,
          number: 1,
          string: ''
        },
        undefined: undefined,
        true: true,
        false: false,
        null: null,
        number: 1,
        string: ''
      })
    },
    'data'
  )

  t.checkU(function () {
    return u('text', '')
  }, 'empty value')

  t.throws(function () {
    toU(
      u('node', {
        foo: {
          bar: [
            'baz',
            function () {
              return 'quux frobozz'
            }
          ]
        }
      })
    )
  }, 'non-JSON (throws)')

  t.end()
})

test('options.builder', function (t) {
  var tree = u('root', {id: 1}, [u('text', {id: 2}, 'foo'), u('empty', [])])
  var code = generate(toU(tree, {builder: 'n'}))
  var n = u

  t.equal(
    code,
    body(function () {
      return n('root', {id: 1}, [n('text', {id: 2}, 'foo'), n('empty', [])])
    })
  )

  t.end()
})

// Run `toU` on a tree and compare result.
// `fn` is the only required argument.
function checkU(tree, options, fn, message) {
  if (typeof tree === 'function') {
    message = options
    fn = tree
    options = {}
    tree = fn()
  }

  if (typeof options === 'function') {
    message = fn
    fn = options
    options = {}
  }

  return this.equal.apply(
    this,
    [generate(toU(tree, options)), body(fn), message].filter(Boolean)
  )
}

// Stringify the body of a function expression into the default Escodegen
// format.
function body(fn) {
  var estree = acorn.parseExpressionAt(String(fn))
  var body

  if (estree.type !== 'FunctionExpression') {
    throw new Error('FunctionExpression expected')
  }

  body = estree.body.body

  if (body.length !== 1) {
    throw new Error('Single statement expected')
  }

  if (body[0].type !== 'ReturnStatement') {
    throw new Error('ReturnStatement expected')
  }

  return generate(body[0].argument)
}
