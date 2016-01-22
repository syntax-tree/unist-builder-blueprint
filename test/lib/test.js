'use strict';

var toU = require('../..'),
    body = require('./function-body');

var tape = require('tape'),
    escodegen = require('escodegen').generate;


tape.Test.prototype.checkU = checkU;
module.exports = tape;


// Run `toU` on Unist tree and compare result.
// `builderFn` is the only required argument.
function checkU (ast, toUOpts, builderFn, message) {
  if (typeof ast == 'function') {
    message = toUOpts;
    builderFn = ast;
    return checkU.call(this, builderFn(), {}, builderFn, message);
  }
  if (typeof toUOpts == 'function') {
    message = builderFn;
    builderFn = toUOpts;
    return checkU.call(this, ast, {}, builderFn, message);
  }

  return this.equal.apply(this, [
    escodegen(toU(ast, toUOpts)),
    body(builderFn),
    message
  ].filter(Boolean));
}
