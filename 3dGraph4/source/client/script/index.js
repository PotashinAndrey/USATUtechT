import {$} from './script.js';

import {Canvas} from '/javascript-canvas/index.js';
import {Vector} from '/javascript-algebra/index.js';

const canvas = $('canvas');

const width = 1000;
const height = 600;
const x = 50;
const y = 100;
const w = 400;
const h = 300;

const context = new Canvas(canvas);
const size    = Vector.from(width, height); // размеры холста

const pointA = Vector.from(x, y); // координаты точек
const pointB = Vector.from(w, h);

context.port(size)
  .begin()
    .style({stroke: 'red', fill: 'lime'})
    .move(pointA)
    .rect(pointB)
    .fill()
    .stroke()
  .end();
