let trazos = [];
let trazoActual = null;

const paleta = [
  [222, 218, 145],
  [191, 186, 176],
  [166, 136, 99],
  [198, 153, 144],
  [144, 178, 126],
  [238, 227, 202]
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(...paleta[5]);
  textFont('Cormorant Garamond');
  textSize(72); // Tamaño elegante
  textAlign(CENTER, TOP);
  smooth();
}

function draw() {
  background(...paleta[5]);

  // Blanco semitransparente suave como el de tu sitio
  fill(255, 255, 255, 180); // blanco sutil
  noStroke();
  text("Dibuja un recuerdo", width / 2, height * 0.04);

  for (let t of trazos) {
    t.mostrar();
  }

  if (trazoActual) {
    trazoActual.mostrar();
  }

  noCursor();
  fill(30, 30, 30, 50);
  ellipse(mouseX, mouseY, 20, 20);
}

function mousePressed() {
  let c = paleta[floor(random(paleta.length - 1))];
  trazoActual = new Trazo(c);
}

function mouseDragged() {
  if (trazoActual) {
    trazoActual.agregarPincelada(mouseX, mouseY);
  }
}

function mouseReleased() {
  if (trazoActual) {
    trazos.push(trazoActual);
    trazoActual = null;
  }
}

function keyPressed() {
  if (key === 'z' || key === 'Z') {
    if (trazos.length > 0) {
      trazos.pop();
    }
  }
}

class Trazo {
  constructor(col) {
    this.puntos = [];
    this.c = col;
  }

  agregarPincelada(x, y) {
    for (let i = 0; i < 5; i++) {
      let ox = random(-8, 8);
      let oy = random(-8, 8);
      this.puntos.push(createVector(x + ox, y + oy));
    }
  }

  mostrar() {
    noStroke();
    fill(this.c[0], this.c[1], this.c[2], 200);
    for (let p of this.puntos) {
      let tam = random(8, 14);
      ellipse(p.x, p.y, tam, tam);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
