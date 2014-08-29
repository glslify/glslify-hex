var through = require('through')
var regex = /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/gi

module.exports = transform

function transform(file) {
  var buffer = []

  return through(write, flush)

  function write(data) {
    buffer.push(data)
  }

  function flush() {
    buffer = buffer.join('')
    buffer = buffer.replace(regex, function(whole, r, g, b, a) {
      r = makeFloat(parseInt(r, 16) / 255)
      g = makeFloat(parseInt(g, 16) / 255)
      b = makeFloat(parseInt(b, 16) / 255)
      a = makeFloat(parseInt(a, 16) / 255)

      return isNaN(a)
        ? 'vec3('+[r,g,b].join(',')+')'
        : 'vec4('+[r,g,b,a].join(',')+')'
    })

    this.queue(buffer)
    this.queue(null)
  }
}

function makeFloat(n) {
  return String(n).indexOf('.') === -1
    ? n + '.'
    : n
}
