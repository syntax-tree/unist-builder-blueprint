'use strict';

var test = require('./lib/test');


test('unist spec', function (t) {
  t.checkU({ type: 'rule' }, function () {
    u('rule');
  }, 'type only');

  t.checkU({ type: 'text', value: 'foo' }, function () {
    u('text', 'foo');
  }, 'type and value');

  t.checkU({ type: 'node', children: [] }, function () {
    u('node', []);
  }, 'type and children');

  t.checkU({
    type: 'root',
    childIndex: undefined,
    leaf: false,
    children: [{
      type: 'node',
      leaf: false,
      childIndex: 0,
      children: [{
        type: 'text',
        childIndex: 0,
        leaf: true,
        value: 'foo',
        raw: 'Foo'
      }]
    }, {
      type: 'text',
      childIndex: 1,
      leaf: true,
      value: 'bar',
      raw: ' bar'
    }]
  }, function () {
    u('root', { childIndex: undefined, leaf: false }, [
      u('node', { leaf: false, childIndex: 0 }, [
        u('text', { childIndex: 0, leaf: true, raw: 'Foo' }, 'foo')
      ]),
      u('text', { childIndex: 1, leaf: true, raw: ' bar' }, 'bar')
    ]);
  }, 'properties');

  t.end();
});
