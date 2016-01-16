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

  t.end();
});
