
// Etapa 2
// Criação de uma cobra movendo-se sem controles

// determina o tamanho de cada parte do grid
let resolucao = 20;
let snake;

function setup() {
  createCanvas(600, 400);
  //modifica a quantidade de frames que são desenhados na função draw()
  frameRate(5);

  //define a cobra do jogo
  snake = {
    x:0, //posição inicial horizontal
    y:0 //posição inicial vertical
  };
}

function draw() {
  background(220);

  //para ver o grid remova os comentários
  // //percorre a largura do canvas para criar as partes que compõem o grid
  // for (let x = 0; x < width; x += resolucao) {
  //   //percorre a algura do canvas para criar as partes que compõem o grid
  //   for (let y = 0; y < height; y += resolucao) {
  //           stroke(200);
  //     noFill();
  //     //cria um retangulo
  //     //rect(x, y, width, height)
  //     rect(x, y, resolucao, resolucao);
  //   }
  // }

  //modifica a posição x da cobra
  snake.x += 1;
  //modifica a posição y da cobra
  snake.y += 1;

  //muda a cor;
  //fill(R, G, B)
  fill(0, 255, 0);
  //desenha a cobra baseada nos valoes de snake.x e snake.y e a resolucao;
  //rect(x, y, width, height)
  rect(snake.x * resolucao, snake.y * resolucao, resolucao, resolucao);
}