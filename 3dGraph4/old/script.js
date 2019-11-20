import {Vector, Quatern, Matrix} from '/javascript-algebra/index.js';
import {Canvas, Path} from '/javascript-canvas/index.js';

const pi = Math.PI;
const oneStep = pi/32;
let flag = false;

let canvas = document.getElementById("canvas");
// let gl;

if (!canvas.getContext('2d')) alert('увы');
let ctx = canvas.getContext('2d');
const context = new Canvas(canvas);
const size = Vector.from(1024, 766);
context.port(size);

const center = size.half();
context.translate(center);

let points = [[0,1.5,0],[1,1.5,0],[1,1.3,0],[0.6,1.1,0],[0.7,1,0],[0.7,0.9,0],[0.6,0.8,0],[0.4,-1,0],[0.6, -1.1,0],[0.6, -1.2,0],[0.55, -1.3,0],[0.6, -1.4,0],[0.6, -1.5,0],[0.5, -1.7,0],[0.4, -1.8,0],[0.2, -1.9,0],[0, -2,0]];
let vectors = [];

let range = document.getElementById('range');
let rangeValue = 0.02;
range.addEventListener('change', () => {rangeValue = +range.value});

let j = 0;
let k = 0;
let delta = 1;
draw(vectors);

function draw(vectors) {
  context.CLEAR();
  drawFigure(points, vectors, k, j);
  vectors.length = 0;

  // j += 0.05;
  k += delta*rangeValue;
  if (flag) setTimeout(() => draw(vectors), 30);
}

function drawFigure(points, vectors, deformation, i = 0) {
  while(oneStep*i <= 2*pi) {
    vectors.push(calculateDeformation(points, oneStep*i));
    i++;
  }

  let vectorsP = vectors.map(e => rotateXYZ(e, deformation));
  // rotateXYZ(vectors[0], deformation);
  // console.log('avada', vectorsP);
  vectorsP.forEach(e => drawOneLine(e));
}

function rotateXYZ(vectors, deformation) {
  const matrixX = Matrix.rotateX(deformation);
  const matrixY = Matrix.rotateY(deformation);
  const matrixZ = Matrix.rotateZ(deformation);

  let vectorsToRotate = vectors.map(e => Matrix.from(e).transpose());
  // console.log(vectorsToRotate);
  let result = vectorsToRotate.map(e => e.multiply(matrixX).multiply(matrixY).multiply(matrixZ).row(0));
  console.log(result);

  return result;
}

function calculateDeformation(points, deformation) {
  const matrix = Matrix.rotateY(deformation);
  const vectors = points.map(e => new Vector(e));
  let vectorMatrixes = vectors.map(e => Matrix.from(e).transpose());
  let result = vectorMatrixes.map(e => e.multiply(matrix).row(0).scale(150));
  return result;
}

function drawOneLine(vectors) {
  context
    .begin()
    .MOVE(Vector.zero)
    .MOVE(vectors[0]);
  vectors.forEach(p => context.LINE(p));
  // context.LINE(vectors[0])
  context.stroke()
    .end();
}

canvas.addEventListener('mouseover', () => {flag = true;
draw(vectors);} );
canvas.addEventListener('mouseout', () => {flag = false;
draw(vectors);} );
canvas.addEventListener('click', () => {delta *= -1} );


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

