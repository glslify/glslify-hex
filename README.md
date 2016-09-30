# glslify-hex [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A transform stream for [glslify](http://github.com/chrisdickinson/glslify)
that replaces CSS-style hexadecimal colors with `vec3/vec4` definitions.

## Usage

[![NPM](https://nodei.co/npm/glslify-hex.png)](https://nodei.co/npm/glslify-hex/)

Once you've enabled the stream, you simply put your hex colors in your file
like so:

``` glsl
void main() {
  gl_FragColor = vec4(#ff0000, 1.0);
}
```

The above color will be (naïvely) replaced with a GLSL `vec3` definition, i.e.:

``` glsl
void main() {
  gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), 1.0);
}
```

You can also use 8-digit hexadecimals for `vec4` definitions. The above
example could also be expressed like so:

``` glsl
void main() {
  gl_FragColor = #ff0000ff;
}
```

To use glslify transform streams, you currently need to use `glslify-stream`
directly:

``` javascript
var createStream = requrire('glslify-stream')

var stream = createStream('./shader.vert', {
  transform: ['glslify-hex']
})

stream.pipe(process.stdout)
```

This might have changed by the time you read this though, so be sure to double
check the glslify documentation!

## License

MIT. See [LICENSE.md](http://github.com/stackgl/glslify-hex/blob/master/LICENSE.md) for details.
