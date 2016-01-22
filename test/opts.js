'use strict';

var toU = require('..'),
    functionBody = require('./lib/function-body');

var u = require('unist-builder'),
    escodegen = require('escodegen').generate,
    test = require('tape');


test('opts.builder', function (t) {
  var ast = u('root', { id: 1 }, [
    u('text', { id: 2 }, 'foo'),
    u('empty', [])
  ]);

  var code = escodegen(toU(ast, { builder: 'NODE' }));

  t.equal(code, functionBody(function () {
    return NODE('root', { id: 1 }, [
      NODE('text', { id: 2 }, 'foo'),
      NODE('empty', [])
    ]);
  }));
  t.end();
});
