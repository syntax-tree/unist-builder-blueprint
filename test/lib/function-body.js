'use strict';

var acorn = require('acorn'),
    escodegen = require('escodegen').generate;


// Stringify the body of a function expression
// into the default Escodegen format.
module.exports = function (builderFn) {
  var estree = acorn.parseExpressionAt(builderFn.toString());

  if (estree.type != 'FunctionExpression') {
    throw Error('FunctionExpression expected');
  }

  var body = estree.body.body;

  if (body.length != 1) {
    throw Error('Single statement expected');
  }
  if (body[0].type != 'ExpressionStatement') {
    throw Error('ExpressionStatement expected');
  }

  return escodegen(body[0].expression);
};
