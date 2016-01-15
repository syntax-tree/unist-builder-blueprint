'use strict';

var flatmap = require('flatmap');


module.exports = function (unist, opts) {
  opts = opts || {};
  opts.builder = opts.builder || 'u';

  return (function toU (node) {
    return {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: opts.builder
      },
      arguments: [
        {
          type: 'Literal',
          value: node.type
        },
        propsNode(node),
        node.value && {
          type: 'Literal',
          value: node.value
        },
        node.children && {
          type: 'ArrayExpression',
          elements: node.children.map(function (child) {
            return toU(child);
          })
        }
      ].filter(Boolean)
    };
  }(unist));
};


// Create ESTree object literal node representing Unist node properties.
function propsNode (node) {
  var props = flatmap(Object.keys(node), function (key) {
    if (key != 'type' && key != 'value' && key != 'children') {
      return {
        type: 'Property',
        key: {
          type: 'Identifier',
          name: key
        },
        value: {
          type: 'Literal',
          value: node[key]
        }
      };
    }
  });

  return props.length && {
    type: 'ObjectExpression',
    properties: props
  };
}
