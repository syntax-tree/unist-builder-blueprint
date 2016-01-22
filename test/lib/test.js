'use strict';

var toU = require('../..'),
    body = require('./function-body');

var tape = require('tape'),
    escodegen = require('escodegen').generate;


tape.Test.prototype.checkU = checkU;
module.exports = tape;


function checkU (toUOpts, builderFn, message) {
  if (typeof toUOpts != 'object') {
    return checkU.call(this, {}, toUOpts, builderFn);
  }

  return this.equal.apply(this, [
    escodegen(toU(builderFn(), toUOpts)),
    body(builderFn),
    message
  ].filter(Boolean));
}
