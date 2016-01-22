'use strict';

var test = require('./lib/test'),
    toU = require('..');

var u = require('unist-builder');


test('unist spec', function (t) {
  t.checkU(function () {
    return u('rule');
  }, 'type only');

  t.checkU(function () {
    return u('text', 'foo');
  }, 'type and value');

  t.checkU(function () {
    return u('node', []);
  }, 'type and children');

  t.checkU(function () {
    return u('root', { childIndex: undefined, leaf: false }, [
      u('node', { leaf: false, childIndex: 0 }, [
        u('text', { childIndex: 0, leaf: true, raw: 'Foo' }, 'foo')
      ]),
      u('text', { childIndex: 1, leaf: true, raw: ' bar' }, 'bar')
    ]);
  }, 'properties');

  t.checkU(u('node', {
      array: [1, 2, 3],
      object: {
        foo: 'bar',
        level2: [
          Object.create(null),
          String.prototype
        ]
      }
  }), function () {
    return u('node', {
      array: [1, 2, 3],
      object: {
        foo: 'bar',
        level2: [
          {},
          {}
        ]
      }
    });
  }, 'composite properties');

  t.throws(function () {
    toU(u('node', {
      foo: {
        bar: [
          'baz',
          function () { return 'quux' + 'frobozz' }
        ]
      }
    }));
  }, 'function properties (throws)');

  t.checkU(function () {
    return u('node', {
      position: {
        start: {
          line: 1,
          column: 1
        },
        end: {
          line: 100500,
          column: 80,
          offset: 77
        },
        indent: [
          1,
          2,
          3
        ]
      }
    });
  }, 'position property');

  t.checkU(u('node', {
    data: {
      null: undefined,
      functions: [
        Function.prototype,
        function () { return 'foo' + 'bar' }
      ]
    },
    specialOnlyOnTop: {
      data: {
        null: undefined
      },
    }
  }), function () {
    return u('node', {
      data: {
        functions: [
          null,
          null
        ]
      },
      specialOnlyOnTop: {
        data: {
          null: undefined
        }
      }
    });
  }, 'data property');

  t.end();
});
