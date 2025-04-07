
// Etapa 4
// Adicionando alimento à cobra. Cada alimento fica em uma posição diferente

// determina o tamanho de cada parte do grid
let resolucao = 20;
let snake;

//será usado para indicar a direção de movimento da cobra
// para a direita = dir = { x: 1, y: 0 };
// para a esquerda = dir = { x: -1, y: 0 };
// para cima = dir = { x: 0, y: -1 };
// para baixo = dir = { x: 0, y: 1 };
let dir = {
  x:1,
  y:0
}

let food;

function setup() {
  createCanvas(600, 400);
  //modifica a quantidade de frames que são desenhados na função draw()
  frameRate(5);

  //define a cobra do jogo
  snake = {
    x:10, //posição inicial horizontal
    y:10 //posição inicial vertical
  };

  foodLocalizacao();
}

function foodLocalizacao(){
  food = { x: floor(random(width / resolucao)) //posicao horizontal. utiliza a largura do canvas / 
    , y: floor(random(height / resolucao)) }; //posicao vertical

}

//função para modificar a direção do movimento
//baseada nas teclas pressionadas
function keyPressed(){
  if (keyCode === LEFT_ARROW) dir = { x: -1, y: 0 };
  else if (keyCode === RIGHT_ARROW) dir = { x: 1, y: 0 };
  else if (keyCode === UP_ARROW) dir = { x: 0, y: -1 };
  else if (keyCode === DOWN_ARROW) dir = { x: 0, y: 1 };
}

function draw() {
  background(220);

  // caso a posicao da cobra e da comida sejam a mesma, cria um novo alimento;
  if (snake.x === food.x && snake.y === food.y) {
    foodLocalizacao();
  }

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
  snake.x += dir.x;
  //modifica a posição y da cobra
  snake.y += dir.y;

  //muda a cor;
  //fill(R, G, B)
  fill(255, 0, 0);
  //desenha o alimento baseada nos valoes de food.x e food.y e a resolucao;
  //rect(x, y, width, height)
  rect(food.x * resolucao, food.y * resolucao, resolucao, resolucao);

  //muda a cor;
  //fill(R, G, B)
  fill(0, 255, 0);
  //desenha a cobra baseada nos valoes de snake.x e snake.y e a resolucao;
  //rect(x, y, width, height)
  rect(snake.x * resolucao, snake.y * resolucao, resolucao, resolucao);
}