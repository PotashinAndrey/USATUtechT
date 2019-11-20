import {Vector, Quatern, Matrix} from '/javascript-algebra/index.js';

let canvas = document.getElementById("canvas");
const gl = canvas.getContext('webgl2');

const vsSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vColor = aVertexColor;
}
`;

const fsSource = `
varying lowp vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`;

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


// function start() {
//   gl = initWebGL(canvas);

//   if (gl) {
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.enable(gl.DEPTH_TEST);
//     gl.depthFunc(gl.LEQUAL);
//     gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
//   }
// }

// function initWebGL(canvas) {
//   gl = null;

//   try {
//     gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
//   }
//   catch(e) {}

//   if (!gl) {
//     alert("Unable to initialize WebGL. Your browser may not support it.");
//     gl = null;
//   }

//   return gl;
// }

// gl.viewport(0, 0, canvas.width, canvas.height);

