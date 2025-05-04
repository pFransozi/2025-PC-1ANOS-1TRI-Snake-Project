// ----- CONFIGURAÇÕES GERAIS ---------------------
const tam = 20;           // lado de cada quadrado (20 px)
let colunas, linhas;      // calculado no setup()
let pontos = 0;           // contador de pontuação

// ----- OBJETO COBRA -----------------------------
let cobra;

class Cobra {
  constructor() {
    this.corpo   = [createVector(5, 5)]; // começa no meio
    this.xdir    = 1;   // direção inicial → direita
    this.ydir    = 0;
    this.crescer = false;
  }

  setDir(x, y) {                      // muda direção
    this.xdir = x;
    this.ydir = y;
  }

  atualizar() {                       // avança 1 passo
    const head = this.corpo.at(-1).copy();
    head.x += this.xdir;
    head.y += this.ydir;
    this.corpo.push(head);

    if (!this.crescer) this.corpo.shift(); // remove cauda
    this.crescer = false;                  // reseta bandeira
  }

  mostrar() {                         // desenha cada segmento
    fill(0, 150, 0);
    noStroke();
    for (const p of this.corpo) rect(p.x, p.y, 1, 1);
  }

  comer(alvo) {                       // colisão com comida?
    const h = this.corpo.at(-1);
    if (h.x === alvo.x && h.y === alvo.y) {
      this.crescer = true;
      pontos++;
      return true;
    }
    return false;
  }

  morreu() {                          // parede ou próprio corpo
    const h = this.corpo.at(-1);

    // parede
    if (h.x < 0 || h.x >= colunas || h.y < 0 || h.y >= linhas) return true;

    // corpo
    for (let i = 0; i < this.corpo.length - 1; i++) {
      const p = this.corpo[i];
      if (p.x === h.x && p.y === h.y) return true;
    }
    return false;
  }
}

// ----- COMIDA -----------------------------------
let comida;

function novaComida() {
  comida = createVector(
    floor(random(colunas)),
    floor(random(linhas))
  );
}

function desenharComida() {
  fill(255, 0, 0);
  noStroke();
  rect(comida.x, comida.y, 1, 1);
}

// ----- GRADE (APENAS VISUAL) --------------------
function grade() {
  stroke(200);
  for (let x = 0; x < width; x += tam) {
    for (let y = 0; y < height; y += tam) {
      noFill();
      rect(x, y, tam, tam);
    }
  }
}

// ----- PONTOS ----------------------------
function mostrarScore() {
  fill(0);
  textSize(1);
  textAlign(LEFT, TOP);
  text('Score: ' + pontos, 0.5, 0.5);
}

// ----- FUNÇÕES PRINCIPAIS p5.js -----------------
function setup() {
  createCanvas(600, 400);
  frameRate(10);

  colunas = floor(width / tam);
  linhas  = floor(height / tam);

  cobra = new Cobra();
  novaComida();
}

function draw() {
  scale(tam);           // transforma 1 unidade em 1 quadrado
  background(220);

  grade();              // desenha tabuleiro
  desenharComida();     // desenha comida

  cobra.atualizar();    // move a cobra

  if (cobra.comer(comida)) novaComida(); // come → gera nova comida

  cobra.mostrar();      // mostra a cobra
  mostrarScore();       // mostra pontos

  if (cobra.morreu()) { // GAME OVER
    textSize(2);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text('GAME OVER', colunas / 2, linhas / 2);
    textSize(1);
    text('Espaço: jogar de novo', colunas / 2, linhas / 2 + 3);
    noLoop();           // pausa o draw()
  }
}

function keyPressed() {
  // controle pelas setas
  if (keyCode === LEFT_ARROW  && cobra.xdir !== 1)  cobra.setDir(-1,  0);
  if (keyCode === RIGHT_ARROW && cobra.xdir !== -1) cobra.setDir( 1,  0);
  if (keyCode === UP_ARROW    && cobra.ydir !== 1)  cobra.setDir( 0, -1);
  if (keyCode === DOWN_ARROW  && cobra.ydir !== -1) cobra.setDir( 0,  1);

  // reiniciar (barra de espaço) se estava parado
  if (key === ' ') reiniciar();
}

function reiniciar() {
  cobra = new Cobra();
  pontos = 0;
  novaComida();
  loop();               // volta a executar draw()
}
