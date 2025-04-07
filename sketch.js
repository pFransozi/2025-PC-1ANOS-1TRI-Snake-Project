
// Etapa 1
// Criação do grid para o jogo snake.

// determina o tamanho de cada parte do grid
let resolucao = 20;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(110);

  //percorre a largura do canvas para criar as partes que compõem o grid
  for (let x = 0; x < width; x += resolucao) {
    //percorre a algura do canvas para criar as partes que compõem o grid
    for (let y = 0; y < height; y += resolucao) {
            stroke(200);
      noFill();
      //cria um retangulo
      //rect(x, y, width, height)
      rect(x, y, resolucao, resolucao);
    }
  }
}