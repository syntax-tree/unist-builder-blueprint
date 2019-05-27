'use strict'

var tape = require('tape')
var escodegen = require('escodegen').generate
var toU = require('../..')
var body = require('./function-body')

tape.Test.prototype.checkU = checkU

module.exports = tape

// Run `toU` on Unist tree and compare result.
// `builderFn` is the only required argument.
function checkU(ast, toUOpts, builderFn, message) {
  if (typeof ast === 'function') {
    message = toUOpts
    builderFn = ast
    return checkU.call(this, builderFn(), {}, builderFn, message)
  }

  if (typeof toUOpts === 'function') {
    message = builderFn
    builderFn = toUOpts
    return checkU.call(this, ast, {}, builderFn, message)
  }

  return this.equal.apply(
    this,
    [escodegen(toU(ast, toUOpts)), body(builderFn), message].filter(Boolean)
  )
}
