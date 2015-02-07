var parse = require('css-annotation').parse

module.exports = function plugin (css, options) {
    options = options || {}

    var annotations = parse(css)

    return function (root) {
        root.eachRule(function (rule) {
            if (checkBaseRule(rule) && checkExtend(rule)) {
                throw new Error('ACSS: cannot inherit rule sets have `@extend`')
            }
        })

        return root
    }
}

function checkBaseRule (node) {
    if (node.nodes) {
        var children = node.nodes
        vat text = ''
        children.forEach(function (child) {
            if (child.type === 'comment') text = child.text
        })
        if (text.match(/\@base/)) return true
    }
    return false
}

function checkExtend (node) {
    if (node.nodes) {
        var children = node.nodes
        var text = ''
        children.forEach(function (child) {
            if (child.type === 'comment') text = child.text
        })
        if (text.match(/\@extend/)) return true
    }
    return false
}