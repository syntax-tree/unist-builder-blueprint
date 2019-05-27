'use strict'

var toU = require('..')
var functionBody = require('./lib/function-body')

var u = require('unist-builder')
var escodegen = require('escodegen').generate
var test = require('tape')

test('opts.builder', function(t) {
  var ast = u('root', {id: 1}, [u('text', {id: 2}, 'foo'), u('empty', [])])
  var code = escodegen(toU(ast, {builder: 'n'}))
  var n = u

  t.equal(
    code,
    functionBody(function() {
      return n('root', {id: 1}, [n('text', {id: 2}, 'foo'), n('empty', [])])
    })
  )
  t.end()
})
