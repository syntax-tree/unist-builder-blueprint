'use strict';

var test = require('./lib/test');


test('opts.builder', function (t) {
  var ast = {
    type: 'root',
    id: 1,
    children: [{
      type: 'text',
      id: 2,
      value: 'foo'
    }, {
      type: 'empty',
      children: []
    }]
  };

  t.checkU(ast, { builder: 'NODE' }, function () {
    NODE('root', { id: 1 }, [
      NODE('text', { id: 2 }, 'foo'),
      NODE('empty', [])
    ]);
  });
  t.end();
});
