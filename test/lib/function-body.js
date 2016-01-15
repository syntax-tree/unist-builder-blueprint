'use strict';

var acorn = require('acorn'),
    escodegen = require('escodegen').generate;


// Stringify the body of a function expression
// into the default Escodegen format.
module.exports = function (funcExpr) {
  var code = funcExpr.toString();
  var estree = acorn.parseExpressionAt(code);
  return escodegen(estree.body.body[0].expression);
};
