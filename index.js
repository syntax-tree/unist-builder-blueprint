'use strict'

module.exports = toU

function toU(tree, options) {
  var settings = options || {}
  var builder = settings.builder || 'u'

  return transform(tree)

  function transform(node) {
    var args = [literal(node.type)]
    var props = []
    var key

    for (key in node) {
      if (key !== 'type' && key !== 'value' && key !== 'children') {
        props.push(property(key, node[key]))
      }
    }

    if (props.length > 0) {
      args.push({type: 'ObjectExpression', properties: props})
    }

    if ('value' in node) {
      args.push(literal(node.value))
    } else if ('children' in node) {
      args.push({
        type: 'ArrayExpression',
        elements: node.children.map(transform)
      })
    }

    return {
      type: 'CallExpression',
      callee: identifier(builder),
      arguments: args
    }
  }
}

// Create ESTree node representing particular JavaScript literal.
function toValue(value) {
  if (value === undefined) {
    return identifier('undefined')
  }

  if (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return literal(value)
  }

  if (typeof value === 'object') {
    return Array.isArray(value) ? array(value) : object(value)
  }

  throw new Error('Invalid non-JSON value in unist tree: ' + String(value))
}

function array(value) {
  return {type: 'ArrayExpression', elements: elements(value)}
}

function object(value) {
  return {type: 'ObjectExpression', properties: properties(value)}
}

function property(key, value) {
  return {type: 'Property', key: identifier(key), value: toValue(value)}
}

function identifier(name) {
  return {type: 'Identifier', name: name}
}

function literal(value) {
  return {type: 'Literal', value: value}
}

function elements(value) {
  var length = value.length
  var index = -1
  var values = []

  while (++index < length) {
    values.push(toValue(value[index]))
  }

  return values
}

function properties(value) {
  var values = []
  var key

  for (key in value) {
    values.push(property(key, value[key]))
  }

  return values
}
