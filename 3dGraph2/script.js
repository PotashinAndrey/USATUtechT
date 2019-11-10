let canvas = document.getElementById("canvas");

canvas.width = 1024;
canvas.height = 766;

if (!canvas.getContext('2d')) alert('увы');
let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;

const cursor = {x: 0, y: 0};
canvas.addEventListener('mousemove', e => {
  cursor.x = e.offsetX;
  cursor.y = e.offsetY;
  Draw();
});

Draw();

function Draw() {
  const w = canvas.width / 2;
  const h = canvas.height / 2;
  ctx.resetTransform();
  ctx.lineWidth = 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(w, h);
  ctx.scale(1, -1);

  drawCells(w, h, 75);
  drawCoordinateAxes(w, h);

  const scale = {x: 30, y: 10};
  ctx.scale(scale.x, scale.y);
  ctx.lineWidth = 1/10;

  const func = x => Math.sin(x) / x;
  const scaleY = func => x => func(x) * 30;

  drawGraphic(w / scale.x, h / scale.y, scaleY(func));

  const cur = {
    x: (cursor.x - w) /  scale.x,
    y: (cursor.y - h) / -scale.y
  }
  drawLinesToCoordinates(w / scale.x, h / scale.y, cur, scaleY(func));

  // window.requestAnimationFrame(Draw)
}


function drawCoordinateAxes(w, h) {
  ctx.beginPath();
  ctx.strokeStyle = "red";

  ctx.moveTo(-w, 0);
  ctx.lineTo(w, 0);

  ctx.moveTo(0, -h);
  ctx.lineTo(0, h);

  ctx.stroke();
  ctx.closePath();
}

function drawCells(w, h, size) {
  const max = Math.max(w, h);
  let step = 0, index = 0;

  ctx.beginPath();
  ctx.strokeStyle = "#888";
  while (step < max) {
    ++index;
    step = size * index;
    drawVerticalLine(h, step);
    drawVerticalLine(h, -step);
    drawHorizontalLine(w, step);
    drawHorizontalLine(w, -step);
  }
  ctx.stroke();
  ctx.closePath();
}

function drawVerticalLine(h, step) {
  ctx.moveTo(step, -h);
  ctx.lineTo(step, h * 2);
}

function drawHorizontalLine(w, step) {
  ctx.moveTo(-w, step);
  ctx.lineTo(w * 2, step);
}

function drawGraphic(w, h, func, step = 0.4) {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 0.2;

  let previous = {}, current = {};
  previous.x = -w;
  previous.y = func(previous.x);

  current.x = previous.x + step;
  while (current.x <= w) {
    current.y = func(current.x);
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(current.x, current.y);

    previous.x = current.x;
    previous.y = current.y;
    current.x += step;
  }

  ctx.stroke();
  ctx.closePath();
}

function drawLinesToCoordinates(w, h, cursor, func) {
  ctx.beginPath();
  ctx.strokeStyle = 'green';

  const y = func(cursor.x);
  ctx.moveTo(cursor.x, 0);
  ctx.lineTo(cursor.x, y);
  ctx.lineTo(0, y);
  // ctx.moveTo(e.offsetX, canvas.height/2 - 51.2*Math.sin(x)/x);
  // ctx.lineTo(canvas.width/2, canvas.height/2 - 51.2*Math.sin(x)/x);
    // ctx.moveTo(e.offsetX, one*Math.sin(e.offsetX*20/canvas.width)/e.offsetX*20/canvas.width);
    // ctx.lineTo(e.offsetX, canvas.height/2);
    // ctx.moveTo(e.offsetX, one*Math.sin(e.offsetX*20/canvas.width)/e.offsetX*20/canvas.width);
    // ctx.lineTo(canvas.width/2, one*Math.sin(e.offsetX*20/canvas.width)/e.offsetX*20/canvas.width);
  ctx.stroke();
  // console.log(e.offsetX, e.offsetY, x, canvas.height/2 - 51.2*Math.sin(x)/x);
  ctx.closePath();
}
