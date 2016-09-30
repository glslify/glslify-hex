var regexLong  = /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/gi
var regexShort = /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?(...)?/gi

module.exports = transform
module.exports.sync = transform

function transform(filename, src, opts, done) {
  src = src.replace(regexLong, function(whole, r, g, b, a) {
    return makeVec(r, g, b, a)
  }).replace(regexShort, function(whole, r, g, b, a, remaining) {
    var str = makeVec(r + r, g + g, b + b, a + a)
    if (remaining === 'ine') return whole
    if (remaining) str += remaining
    return str
  })

  if (typeof done === 'function') done(null, src)
  return src
}

function makeVec(r, g, b, a) {
  r = parseInt(r, 16) / 255
  g = parseInt(g, 16) / 255
  b = parseInt(b, 16) / 255
  a = parseInt(a, 16) / 255

  return isNaN(a)
    ? 'vec3('+[r,g,b].map(makeFloat).join(',')+')'
    : 'vec4('+[r,g,b,a].map(makeFloat).join(',')+')'
}

function makeFloat(n) {
  return String(n).indexOf('.') === -1
    ? n + '.'
    : n
}
