let player;
let enemies = [];
let score = 0;

function setup() {
  createCanvas(600, 400);
  player = createVector(width / 2, height / 2);
  // Cria alguns inimigos iniciais
  for (let i = 0; i < 3; i++) {
    enemies.push(createEnemy());
  }
}

function draw() {
  background(200, 255, 200); // Fundo com tema agrícola

  // Movimento do jogador com as setas
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 3;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 3;
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= 3;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.y += 3;
  }

  // Limitar o jogador dentro da tela
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);

  // Desenhar o jogador
  fill(255, 200, 0);
  ellipse(player.x, player.y, 30, 30);

  // Mostrar pontos
  fill(0);
  textSize(16);
  text("Pontuação: " + score, 10, 20);

  // Atualizar e desenhar inimigos
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    // Seguir o jogador
    let dir = p5.Vector.sub(player, enemy);
    dir.setMag(1.5);
    enemy.add(dir);

    // Desenhar inimigo
    fill(255, 0, 0);
    ellipse(enemy.x, enemy.y, 20, 20);

    // Verificar colisão com o jogador
    if (dist(player.x, player.y, enemy.x, enemy.y) < 15) {
      // Perde o jogo
      noLoop();
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("Game Over! Sua pontuação: " + score, width / 2, height / 2);
    }
  }

  // Criar novos inimigos aleatoriamente
  if (frameCount % 120 === 0) {
    enemies.push(createEnemy());
  }

  // Criar uma "comida" para pontuar
  if (frameCount % 60 === 0) {
    spawnFood();
  }

  // Mostrar comida
  if (food) {
    fill(0, 255, 0);
    ellipse(food.x, food.y, 10, 10);
    // Verificar se o jogador pegou a comida
    if (dist(player.x, player.y, food.x, food.y) < 15) {
      score++;
      food = null;
    }
  }
}

let food = null;

function spawnFood() {
  food = createVector(random(width), random(height));
}

function createEnemy() {
  return createVector(random(width), random(height));
}
