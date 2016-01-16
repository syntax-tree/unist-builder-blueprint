'use strict';

var toU = require('../..'),
    body = require('./function-body');

var tape = require('tape'),
    escodegen = require('escodegen').generate;


tape.Test.prototype.checkU = checkU;
module.exports = tape;


function checkU (/* [toUArgs...], builderFn, [message] */) {
  var toUArgs = [].slice.call(arguments);
  var builderFn = toUArgs.pop();
  var message;

  if (typeof builderFn != 'function') {
    message = builderFn;
    builderFn = toUArgs.pop();
  }

  return this.equal.apply(this, [
    escodegen(toU.apply(null, toUArgs)),
    body(builderFn),
    message
  ].filter(Boolean));
}
