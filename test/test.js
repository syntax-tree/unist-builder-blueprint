'use strict';

var test = require('./lib/test');

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

  t.end();
});
