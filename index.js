'use strict'

module.exports = toU

function toU(tree, options) {
  var settings = options || {}
  var builder = settings.builder || 'u'

  return transform(tree)

  function transform(node) {
    var parameters = [{type: 'Literal', value: node.type}]
    var props = []
    var key

    for (key in node) {
      if (key !== 'type' && key !== 'value' && key !== 'children') {
        props.push({
          type: 'Property',
          key: {type: 'Identifier', name: key},
          value: toValue(node[key])
        })
      }
    }

    if (props.length) {
      parameters.push({type: 'ObjectExpression', properties: props})
    }

    if ('value' in node) {
      parameters.push({type: 'Literal', value: node.value})
    } else if ('children' in node) {
      parameters.push({
        type: 'ArrayExpression',
        elements: node.children.map(transform)
      })
    }

    return {
      type: 'CallExpression',
      callee: {type: 'Identifier', name: builder},
      arguments: parameters
    }
  }
}

// Create ESTree node representing particular JavaScript literal.
function toValue(value) {
  if (value === undefined) {
    return {type: 'Identifier', name: 'undefined'}
  }

  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return {type: 'Literal', value: value}
  }

  if (typeof value === 'object') {
    return Array.isArray(value)
      ? {type: 'ArrayExpression', elements: elements(value)}
      : {type: 'ObjectExpression', properties: properties(value)}
  }

  throw new Error('Invalid non-JSON value in unist tree: ' + String(value))
}

function elements(value) {
  var index = -1
  var result = []

  while (++index < value.length) {
    result.push(toValue(value[index]))
  }

  return result
}

function properties(value) {
  var result = []
  var key

  for (key in value) {
    result.push({
      type: 'Property',
      key: {type: 'Identifier', name: key},
      value: toValue(value[key])
    })
  }

  return result
}
