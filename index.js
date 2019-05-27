'use strict'

var flatmap = require('flatmap')

module.exports = function(unist, opts) {
  opts = opts || {}
  opts.builder = opts.builder || 'u'

  return (function toU(node) {
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
        'value' in node && {
          type: 'Literal',
          value: node.value
        },
        node.children && {
          type: 'ArrayExpression',
          elements: node.children.map(toU)
        }
      ].filter(Boolean)
    }
  })(unist)
}

// Create ESTree object literal node representing Unist node properties.
function propsNode(node) {
  var props = flatmap(Object.keys(node), function(key) {
    if (key === 'type' || key === 'value' || key === 'children') {
      return
    }

    var value = node[key]

    if (key === 'data') {
      value = JSON.parse(JSON.stringify(value))
    }

    return {
      type: 'Property',
      key: {
        type: 'Identifier',
        name: key
      },
      value: literalNode(value)
    }
  })

  return (
    props.length && {
      type: 'ObjectExpression',
      properties: props
    }
  )
}

// Create ESTree node representing particular JavaScript literal.
function literalNode(value) {
  if (value === undefined) {
    return {
      type: 'Identifier',
      name: 'undefined'
    }
  }

  if (typeof value === 'function') {
    throw new TypeError('Unist property contains a function')
  } else if (value === null || typeof value !== 'object') {
    return {
      type: 'Literal',
      value: value
    }
  } else if (Array.isArray(value)) {
    return {
      type: 'ArrayExpression',
      elements: value.map(literalNode)
    }
  } else {
    return {
      type: 'ObjectExpression',
      properties: Object.keys(value).map(function(key) {
        return {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: key
          },
          value: literalNode(value[key])
        }
      })
    }
  }
}
