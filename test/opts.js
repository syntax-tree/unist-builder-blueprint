'use strict';

var toU = require('..'),
    functionBody = require('./lib/function-body');

var test = require('tape'),
    escodegen = require('escodegen').generate;


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

  t.equal(escodegen(toU(ast, { builder: 'NODE' })), functionBody(function () {
    NODE('root', { id: 1 }, [
      NODE('text', { id: 2 }, 'foo'),
      NODE('empty', [])
    ]);
  }));
  t.end();
});
