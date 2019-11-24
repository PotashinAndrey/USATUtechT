import {Vector, Quatern, Matrix} from '/javascript-algebra/index.js';

let canvas = document.getElementById("canvas");
// const gl = canvas.getContext('webgl2');

canvas.addEventListener('mousedown', e => {
});

function func(x, y) {
  return Math.pow(x, 3) - 3*x*Math.pow(y, 2);
}

let pointXY0 = [];
let pointRangeSize ={xStart: -14, xEnd: 15, yStart: -15, yEnd: 14};
for (let i = pointRangeSize.xStart ; i < pointRangeSize.xEnd; i++) {
  for (let j = pointRangeSize.yStart; j < pointRangeSize.yEnd; j++) {
    pointXY0.push([i, j, 0]);
  }
}

let pointXYZ = pointXY0.map(e => [e[0], e[1], func(e[0], e[1])/500]);

let pointXY = pointXYZ;

main(canvas, 1024, 766);

async function main(canvas, width, height) {
  const gl         = canvas.getContext('webgl');
  gl.canvas.width  = width;
  gl.canvas.height = height;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  const vsSource = await fetch('/static/shader/cube.vert.glsl').then(r => r.text());
  const fsSource = await fetch('/static/shader/cube.frag.glsl').then(r => r.text());

  const program = initShaderProgram(gl, vsSource, fsSource);
  const programInfo = {
    program,
    attribute: {
      vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(program, 'aVertexNormal'),
      vertexColor: gl.getAttribLocation(program, 'aVertexColor')
    },
    uniform: {
      projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(program, 'uNormalMatrix'),
      // lightPosition: gl.getUniformLocation(program, 'uLightPosition')
    }
  };

  const buffers = await initBuffers(gl);

  let cubeRotation = 0;
  function render(time) {
    cubeRotation = time / 5000;
    drawScene(gl, programInfo, buffers, cubeRotation);
    requestAnimationFrame(render);
  }

  render(0);
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader   = loadShader(gl, 'VERTEX',  gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, 'FRAGMENT', gl.FRAGMENT_SHADER, fsSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return null;
  }
  return program;
}

function loadShader(gl, name, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(name, gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // const points = vectors.flat(1);
  const positions = pointXY.flat(1);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // const colors = Array.from({length: pointXY.length}, (_, i) => [0.8, 0.8, 0.8, 1]).flat();
  const colors = Array.from({length: pointXY.length}, (_, i) => [i /pointXY.length, 0.0, 1.0 - i /pointXY.length, 1.0]).flat();

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);


  const indices = [];
  const PointToNormales = [];


  // for (let i = 0; i < pointXY; i++) {
  //       indices.push(i);
  //       indices.push(i + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd));
  //       indices.push(i + 1);
        // indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + 1);
        // indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd));
        // indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd));
        // indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + 1);
        // indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + 1);



        // PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j]);
        // PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd)]);
        // PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + 1]);
  // }


  for (let i = 0; i < Math.abs(pointRangeSize.xStart-pointRangeSize.xEnd); i++) {
    for (let j = 0; j < Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd); j++) {
      if (i < Math.abs(pointRangeSize.xStart-pointRangeSize.xEnd) - 1 && j < Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) - 1) {
        indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j);
        indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd));
        indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + 1);
        indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + 1);
        indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + 1);
        indices.push(i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd));


        PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j]);
        PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd)]);
        PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + 1]);
        PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd)]);
        PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + 1]);
        PointToNormales.push(pointXY[i*Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd) + j + 1]);
      }
    }
  }
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


  const normales = [];
  for (let i = 0; i < PointToNormales.length; i+=3) {
    // const n = Vector.normal(new Vector(PointToNormales[i]),new Vector(PointToNormales[i+1]),new Vector(PointToNormales[i+2])).data;
    // normales.push(...n, ...n, ...n);

    // normales.push(...Vector.normal(new Vector(PointToNormales[i+1]),new Vector(PointToNormales[i]),new Vector(PointToNormales[i+2])).data);
    // normales.push(...Vector.normal(new Vector(PointToNormales[i+2]),new Vector(PointToNormales[i+1]),new Vector(PointToNormales[i])).data);
    // normales.push(...Vector.normal(new Vector(PointToNormales[i]),new Vector(PointToNormales[i+2]),new Vector(PointToNormales[i+1])).data);

    let a = new Vector(PointToNormales[i]);
    let b = new Vector(PointToNormales[i + 1]);
    let c = new Vector(PointToNormales[i + 2]);

    // if (i % 2 === 0) b = b.reverse();

    let A = Vector.normal(b, a, c);
    let B = Vector.normal(c, b, a);
    let C = Vector.normal(a, c, b);

    // if (i % 2 === 0) {
    //   a = a.inverse();
    //   b = b.inverse();
    //   c = c.inverse();
    // }

    normales.push(...A.data);
    normales.push(...B.data);
    normales.push(...C.data);

    console.log(A.toString());
    console.log(B.toString());
    console.log(C.toString());

  }

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  // console.log('norm', normales);
  // console.log('ind', indices);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normales),gl.STATIC_DRAW);
  // console.log('norm', normales.flat(1));


  return {
    position: {buffer: positionBuffer, length: positions.length},
    color: {buffer: colorBuffer, length: colors.length},
    indices: {buffer: indexBuffer, length: indices.length},
    normals: {buffer: normalBuffer, length: normales.length, data: normales}
  };
}

function drawScene(gl, programInfo, buffers, cubeRotation/*, light*/) {
  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  // gl.enable(gl.CULL_FACE);
  // gl.cullFace(gl.FRONT);

  // eslint-disable-next-line no-bitwise
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 24;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 2000.0;
  const projectionMatrix = Matrix.perspective(fieldOfView, aspect, zNear, zFar); //.rotateX(0.5);

  let modelViewMatrix = Matrix.identity(4);

  modelViewMatrix = modelViewMatrix
    // .scaleY(-1)
    .translate(Vector.from(0.0, 0.0, -120.0)) // amount to translate
    // .rotateY(flagy ? cubeRotation : 0) // amount to rotate not in radians
    // .rotateX(flagx ? cubeRotation : 0)
    // .rotateZ(flagz ? cubeRotation : 0);
    .rotateX(0) // -0.75
    .rotateZ(0) // -0.3
    .rotateY(cubeRotation); //cubeRotation

  // console.log('model', modelViewMatrix.toString(2));
  const normalMatrix = modelViewMatrix.inverse3D().transpose();
  // console.log('normal', normalMatrix.toString(2));

  // const normalMatrix2 = modelViewMatrix.inverse3D().transpose();
  // console.log('normal3D', normalMatrix2.toString(2));

  // modelViewMatrix = modelViewMatrix.rotateY(Math.PI)

  // const normal = Vector.from(buffers.normals.data[0], buffers.normals.data[1], buffers.normals.data[2]).resize(4);
  // // normal.w = 1;
  // const directionalVector = Vector.from(6.85, 18, 2.75).normalize();
  // const transformedNormal = normalMatrix.vectorCol(normal).col(0).resize(3);
  // const directional = transformedNormal.scalar(directionalVector);
  // const directionalLightColor = Vector.from(1.0, 1.0, 1.0);
  // console.log(normalMatrix.toString(), '\n', normal.toString(),'\n', transformedNormal.toString());
  // console.log('transformedNormal', transformedNormal.toString());
  // console.log('directionalVector', directionalVector.toString());
  // console.log('directional', directional);
  // console.log('color', directionalLightColor.scale(directional).toString());

  { // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position.buffer);
    gl.vertexAttribPointer(programInfo.attribute.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribute.vertexPosition);
  }

  { // Tell WebGL how to pull out the colors from the color buffer into the vertexColor attribute.
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color.buffer);
    gl.vertexAttribPointer(programInfo.attribute.vertexColor, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribute.vertexColor);
  }

  { // Указываем WebGL как извлекать нормали из буфера нормалей в атрибут vertexNormal.
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals.buffer);
    gl.vertexAttribPointer(programInfo.attribute.vertexNormal, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribute.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices.buffer);

  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);

  // Set the shader uniforms
  gl.uniformMatrix4fv(programInfo.uniform.projectionMatrix, false, projectionMatrix.data);
  gl.uniformMatrix4fv(programInfo.uniform.modelViewMatrix, false, modelViewMatrix.data);
  gl.uniformMatrix4fv(programInfo.uniform.normalMatrix, false, normalMatrix.data);
  // gl.uniform3fv(programInfo.uniform.lightPosition, light.data);

  {
    const vertexCount = buffers.indices.length;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    if (true) gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    // if (true) gl.drawElements(gl.TRIANGLE_STRIP, vertexCount, type, offset);
    // if (true) gl.drawElements(gl.TRIANGLE_FAN, vertexCount, type, offset);
    // if (true) gl.drawElements(gl.LINES, vertexCount, type, offset);
    // if (true) gl.drawElements(gl.POINTS, vertexCount, type, offset);
  }
}

// gl.clearColor(1.0, 1.0, 1.0, 1.0);
// gl.clear(gl.COLOR_BUFFER_BIT);



