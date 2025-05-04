# Jogo “Cobrinha” – Tutorial passo a passo no **p5.js Web Editor** 🐍✨

---

## Como usar este tutorial

1. Abra **editor.p5js.org**.  
2. Faça o login
3. Lembre-se, que para rodar o jogo, pressione **▶ Run**.

---

## 0. Tela vazia (a “folha” onde vamos desenhar)

```js
function setup() {
  createCanvas(600, 400);   // cria um papel 600×400
  frameRate(10);            // 10 quadros por segundo
}

function draw() {
  background(220);          // pinta de cinza claro
}
```

- **`setup()`** acontece **uma vez**.  
- **`draw()`** roda **em loop** – 10 vezes por segundo.  

---

## 1. Desenhando a grade  
*(loops, retângulos)*

A cobrinha anda sobre um “caderno quadriculado”.

```js
const tam = 20;   // cada quadrado mede 20 px

function grade() {
  stroke(200);    // cor das linhas
  for (let x = 0; x < width; x += tam) {
    for (let y = 0; y < height; y += tam) {
      noFill();
      rect(x, y, tam, tam);
    }
  }
}

function draw() {
  background(220);
  grade();        // chama a grade
}
```

---

## 2. Movimento automático da cobra  
*(classe simples + vetor)*

```js
let cobra;               // objeto cobra
let colunas, linhas;     // quantos quadrados cabem

class Cobra {
  constructor() {
    this.corpo = [createVector(5, 5)]; // começa no meio
    this.xdir = 1;  // direita
    this.ydir = 0;
    this.crescer = false;
  }

  setDir(x, y) { this.xdir = x; this.ydir = y; }

  atualizar() {
    const head = this.corpo.at(-1).copy();
    head.x += this.xdir;
    head.y += this.ydir;
    this.corpo.push(head);
    if (!this.crescer) this.corpo.shift();  // remove cauda
    this.crescer = False;
  }

  mostrar() {
    fill(0, 150, 0);
    noStroke();
    for (const p of this.corpo) rect(p.x, p.y, 1, 1);
  }
}

function setup() {
  createCanvas(600, 400);
  frameRate(10);
  colunas = floor(width / tam);
  linhas  = floor(height / tam);
  cobra = new Cobra();
}

function draw() {
  scale(tam);         // trabalha em “quadrados”, não px
  background(220);
  grade();
  cobra.atualizar();
  cobra.mostrar();
}
```

Rodou? A “cabeça” verde desliza sozinha → direita.

---

## 3. Controle pelo teclado  
*(eventos)*

```js
function keyPressed() {
  if (keyCode === LEFT_ARROW  && cobra.xdir !==  1) cobra.setDir(-1,  0);
  if (keyCode === RIGHT_ARROW && cobra.xdir !== -1) cobra.setDir( 1,  0);
  if (keyCode === UP_ARROW    && cobra.ydir !==  1) cobra.setDir( 0, -1);
  if (keyCode === DOWN_ARROW  && cobra.ydir !== -1) cobra.setDir( 0,  1);
}
```

Agora você guia a cobra com as setas! 🎮

---

## 4. Posicionamento e consumo da comida  
*(aleatório + colisão simples)*

```js
let comida;

function novaComida() {
  comida = createVector(floor(random(colunas)), floor(random(linhas)));
}

function setup() {
  /* ...código anterior... */
  novaComida();
}

function desenharComida() {
  fill(255, 0, 0);
  noStroke();
  rect(comida.x, comida.y, 1, 1);
}

Cobra.prototype.comer = function(pos){
  const h = this.corpo.at(-1);
  if (h.x === pos.x && h.y === pos.y) {
    this.crescer = true;   // sinaliza para crescer
    return true;
  }
  return false;
};
```

Em `draw()` logo depois de `cobra.atualizar()`:

```js
if (cobra.comer(comida)) novaComida();
desenharComida();
```

- **Quando colide**, `crescer` vira `true` → a cauda **não** é removida → cobra aumenta.

---

## 5. Crescimento da cobra  
*(arrays e lógica)*

Já está funcionando (graças ao sinal `crescer`). Observe:  
- Ao comer, o corpo **não é cortado**: +1 segmento.  
- Fora isso, o `shift()` continua removendo a cauda.

---

## 6. Condição de derrota (Game Over)  
*(colisão parede + corpo)*

```js
Cobra.prototype.morreu = function(){
  const h = this.corpo.at(-1);

  // parede
  if (h.x < 0 || h.x >= colunas || h.y < 0 || h.y >= linhas) return true;

  // bateu em si mesma
  for (let i = 0; i < this.corpo.length - 1; i++) {
    const p = this.corpo[i];
    if (p.x === h.x && p.y === h.y) return true;
  }
  return false;
};
```

No `draw()`:

```js
if (cobra.morreu()) {
  noLoop();                       // pausa tudo
  textSize(2);
  fill(255,0,0);
  textAlign(CENTER,CENTER);
  text('GAME OVER', colunas/2, linhas/2);
  return;
}
```

---

## 7. Reinício do jogo  
*(estado)*

```js
function keyPressed() {
  /* setas ... */
  if (key === ' ') reiniciar();   // barra de espaço
}

function reiniciar() {
  cobra = new Cobra();
  novaComida();
  loop();                         // volta a rodar o draw()
}
```

---

## 8. Sistema de pontuação  
*(contador & texto dinâmico)*

```js
let pontos = 0;

Cobra.prototype.comer = function(pos){
  const h = this.corpo.at(-1);
  if (h.x === pos.x && h.y === pos.y) {
    this.crescer = true;
    pontos++;                     // +1 ponto
    return true;
  }
  return false;
};

function mostrarScore() {
  fill(0);
  textSize(1);
  textAlign(LEFT, TOP);
  text('Score: ' + pontos, 0.5, 0.5);
}

function draw() {
  /* ...restante... */
  mostrarScore();
}
```

Pontuação aparece no canto ✨

---

## 9. Personalização e melhorias visuais  
*(criatividade)*

- **Mude cores** em `fill()` – faça a comida virar 🍎 ou 🌟.  
- **Dificuldade**: aumente `frameRate()` cada 5 pontos.  
- **Sons**: adicione p5.sound e toque *blip* quando comer.  
- **Obstáculos**: desenhe blocos fixos e trate colisão.

---