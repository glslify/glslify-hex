var from = require('new-from')
var test = require('tape')
var hex = require('./')
var bl = require('bl')

test('glslify-hex: vec3', function(t) {
  var original = [
      'void main() {'
    , '  gl_FragColor = vec4(#ff0000, 1.0);'
    , '}'
  ].join('\n')

  var expected = [
      'void main() {'
    , '  gl_FragColor = vec4(vec3(1.,0.,0.), 1.0);'
    , '}'
  ].join('\n')

  hex(null, original, {}, function(err, actual) {
    if (err) return t.ifError(err)
    t.equal(actual.toString(), expected)
    t.end()
  })
})

test('glslify-hex: vec4', function(t) {
  var original = [
      'void main() {'
    , '  gl_FragColor = #ff0000ff;'
    , '}'
  ].join('\n')

  var expected = [
      'void main() {'
    , '  gl_FragColor = vec4(1.,0.,0.,1.);'
    , '}'
  ].join('\n')

  hex(null, original, {}, function(err, actual) {
    if (err) return t.ifError(err)
    t.equal(actual.toString(), expected)
    t.end()
  })
})

test('glslify-hex: vec3 shorthand', function(t) {
  var original = [
      'void main() {'
    , '  gl_FragColor = vec4(#f00, 1.0);'
    , '}'
  ].join('\n')

  var expected = [
      'void main() {'
    , '  gl_FragColor = vec4(vec3(1.,0.,0.), 1.0);'
    , '}'
  ].join('\n')

  hex(null, original, {}, function(err, actual) {
    if (err) return t.ifError(err)
    t.equal(actual.toString(), expected)
    t.end()
  })
})

test('glslify-hex: vec3 shorthand (#define safe)', function(t) {
  var original = [
      '#define PI 3.14'
    , '#ifdef PI'
    , '#endif'
    , 'void main() {'
    , '  gl_FragColor = vec4(#f00, 1.0);'
    , '}'
  ].join('\n')

  var expected = [
      '#define PI 3.14'
    , '#ifdef PI'
    , '#endif'
    , 'void main() {'
    , '  gl_FragColor = vec4(vec3(1.,0.,0.), 1.0);'
    , '}'
  ].join('\n')

  hex(null, original, {}, function(err, actual) {
    if (err) return t.ifError(err)
    t.equal(actual.toString(), expected)
    t.end()
  })
})

test('glslify-hex: vec4 shorthand', function(t) {
  var original = [
      'void main() {'
    , '  gl_FragColor = #f00f;'
    , '}'
  ].join('\n')

  var expected = [
      'void main() {'
    , '  gl_FragColor = vec4(1.,0.,0.,1.);'
    , '}'
  ].join('\n')

  hex(null, original, {}, function(err, actual) {
    if (err) return t.ifError(err)
    t.equal(actual.toString(), expected)
    t.end()
  })
})
