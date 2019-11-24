import {Vector, Quatern, Matrix} from '/javascript-algebra/index.js';

let canvas = document.getElementById("canvas");
// const gl = canvas.getContext('webgl2');

function func(x, y) {
  return Math.pow(x, 3) - 3*x*Math.pow(y, 2);
}

let pointXY0 = [];
// let pointRangeSize ={xStart: -2, xEnd: 3, yStart: -3, yEnd: 2};
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
  let mouseFlag = false;

  canvas.addEventListener('mousemove', e => {
    if (mouseFlag) {
      cubeRotation.x += (e.offsetY - canvas.height/2)/30000;
      cubeRotation.y += (e.offsetX - canvas.width/2)/50000;
    }
    })

  canvas.addEventListener('mousedown', () => {
    mouseFlag = true;
  });

  canvas.addEventListener('mouseup', () => {
    mouseFlag = false;
  });

  const buffers = await initBuffers(gl);

  let cubeRotation = {
    x: 0,
    y: 0
  };

  function render(time) {
    // cubeRotation = time / 5000;
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

  // const indices = [];
  let PointToNormales = [];

  const W = Math.abs(pointRangeSize.xStart-pointRangeSize.xEnd);
  const H = Math.abs(pointRangeSize.yStart-pointRangeSize.yEnd);
  const indices = createIndices(W, H);

  PointToNormales = Array.from({length: indices.length}, (_, i) => (pointXY[indices[i]]));
  console.log(indices);
  console.log(PointToNormales);
  // indices[0] = 1;
  // const indices = initializeGrid(W, H);
  // const indices = getIndices(W, H);
  // for (let i = 0; i < W - 1; i++) {
  //   // if (i > 0) indices.push(i * W);
  //   for (let j = 0; j < H; j++) {
  //     // if (i < W -1 && j < H - 1 ) {
  //       // indices.push(i * H + j);
  //       // indices.push(i * H + j + H);
  //       // indices.push(i * H + j + 1);
  //       // indices.push(i * H + j + 1);
  //       // indices.push(i * H + j + H + 1);
  //       // indices.push(i * H + j + H);

  //       // PointToNormales.push(pointXY[i * H + j]);
  //       // PointToNormales.push(pointXY[i * H + j + H]);
  //       // PointToNormales.push(pointXY[i * H + j + 1]);
  //       // PointToNormales.push(pointXY[i * H + j + 1]);
  //       // PointToNormales.push(pointXY[i * H + j + H + 1]);
  //       // PointToNormales.push(pointXY[i * H + j + H]);

  //       indices.push(i * W + j);
  //       // indices.push(i * H + j + 1);
  //       indices.push((i + 1) * W + j);
  //       // indices.push(i * H + j + 1);
  //       // indices.push(i * H + j + H + 1);
  //       // indices.push(i * H + j + 1);

  //       if (i < W - 2) indices.push((i + 1) * W + j);

  //       // PointToNormales.push(pointXY[i * H + j]);
  //       // PointToNormales.push(pointXY[i * H + j + 1]);
  //       // PointToNormales.push(pointXY[i * H + j + H]);
  //       // PointToNormales.push(pointXY[i * H + j + 1]);
  //       // PointToNormales.push(pointXY [i * H + j + H + 1]);
  //       // PointToNormales.push(pointXY[i * H + j + 1]);
  //     // } else {
  //     //   if (j < H - 1) { // правый край

  //     //   }
  //     //   if (i < W - 1) {
  //     //     indices.push(i * H + j + H);
  //     //     indices.push(i * H + j + H);
  //     //     indices.push(i * H + j + H);
  //     //   }
  //     // }
  //     // }
  //   }
  // }

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


  const normales = [];
  for (let i = 0; i < PointToNormales.length-2; i+=3) {
    // const n = Vector.normal(new Vector(PointToNormales[i]),new Vector(PointToNormales[i+1]),new Vector(PointToNormales[i+2])).data;
    // normales.push(...n, ...n, ...n);

    // normales.push(...Vector.normal(new Vector(PointToNormales[i+1]),new Vector(PointToNormales[i]),new Vector(PointToNormales[i+2])).data);
    // normales.push(...Vector.normal(new Vector(PointToNormales[i+2]),new Vector(PointToNormales[i+1]),new Vector(PointToNormales[i])).data);
    // normales.push(...Vector.normal(new Vector(PointToNormales[i]),new Vector(PointToNormales[i+2]),new Vector(PointToNormales[i+1])).data);

    let a = new Vector(PointToNormales[i]);
    let b = new Vector(PointToNormales[i + 1]);
    let c = new Vector(PointToNormales[i + 2]);

    // if (i % 2 === 0) b = b.reverse();

    // if (i % 1 === 0) {
    //   a = a.inverse();
    //   b = b.inverse();
    //   c = c.inverse();
    // }

    let A = Vector.normal(b, a, c);
    let B = Vector.normal(c, b, a);
    let C = Vector.normal(a, c, b);

    normales.push(...A.data);
    normales.push(...B.data);
    normales.push(...C.data);

    // console.log(A.toString());
    // console.log(B.toString());
    // console.log(C.toString());

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
  gl.frontFace(gl.CW);

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
    .rotateX(cubeRotation.x) // -0.75
    .rotateZ(0) // -0.3
    .rotateY(cubeRotation.y);
    // .rotateY(0.57);

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
    // if (true) gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    if (true) gl.drawElements(gl.TRIANGLE_STRIP, vertexCount, type, offset);
    // if (true) gl.drawElements(gl.TRIANGLE_FAN, vertexCount, type, offset);
    // if (true) gl.drawElements(gl.LINES, vertexCount, type, offset);
    // if (true) gl.drawElements(gl.POINTS, vertexCount, type, offset);
  }
}

// gl.clearColor(1.0, 1.0, 1.0, 1.0);
// gl.clear(gl.COLOR_BUFFER_BIT);


function createIndices(width, height, out) {
  var size = height + (height - 1) * ((width - 2) << 1);
  var w_minus_one = width - 1;
  var base = (width - 2) << 1;
  var max = width * height;
  var shiftRight = 0;
  var idx = 1;
  var l0 = -width;
  var l1 = 0;
  var x = 1;
  var y = 0;
  var i = 0;
  out = out ?
    out.subarray(0, size) :
    new (max > 0xFFFF ? Uint32Array : Uint16Array)(size);

  out[0] = 1;
  for (; y < height - 1; ++y) {
    l0 = l1;
    l1 = l0 + width;
    i = idx;
    idx += 1 + ((width - 2) << 1);
    if (y & 1) {
      out[i + base] = 1 + l1;
      for(; x > 1; --x, i += 2) {
        out[i] = x - 1 + l0;
        out[i + 1] = x + l1;
      }
    } else {
      out[i + base] = w_minus_one + l1;
      for(; x < w_minus_one; ++x, i += 2) {
        out[i] = x + 1 + l0;
        out[i + 1] = x + l1;
      }
    }
  }
  return out;
}

function initializeGrid(cols,rows)
{
    var RCvertices=2*cols*(rows-1);
    var TSvertices=2*cols*(rows-1)+2*(rows-2);
    // let numVertices=TSvertices;
    var j=0;
    const trianglestrip = new Array(TSvertices - 1)
    for(var i = 1; i <= RCvertices; i += 2)
    {
        trianglestrip[ j ] = (1 +i)/2;
        trianglestrip[ j +1 ] = (cols*2 + i + 1) / 2;
        if( trianglestrip[ j +1 ] % cols == 0)
        {
            if( trianglestrip[ j +1 ] != cols && trianglestrip[ j +1 ] != cols*rows )
            {
                trianglestrip[ j +2 ] = trianglestrip[ j +1 ];
                trianglestrip[ j +3 ] = (1 + i + 2) / 2;
                j += 2;
            }
        }
        j += 2;
    }
    return trianglestrip;
}

function getIndices(width, height) {
  // if ( indices ) return indices;

  const indices = []; // new int[ iSize];
  var i = 0;

  for (let row = 0; row < height - 1; row++) {
    if ((row & 1) === 0) { // even rows
      for (let col = 0; col < width; col++) {
        indices.push(col + row * width);
        indices.push(col + (row + 1) * width);
      }
    } else { // odd rows
      for (let col = width - 1; col > 0; col--) {
        indices.push(col + (row + 1) * width);
        indices.push(col - 1 + row * width); // !
      }
    }
  }
  // if ((mHeight & 1) && mHeight > 2) {
  //   mpIndices[i++] = (mHeight-1) * mWidth;
  // }

  return indices;
}

