let canvas = document.getElementById("snake");
let context = canvas.getContext ("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let aparecerComida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function cobrinhaCriada() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function comida() {
    context.fillStyle = "white";
    context.fillRect(aparecerComida.x, aparecerComida.y, box, box);
}

document.addEventListener('keydown', update);

function update (event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down"; 
}

function inicioJogo() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Fim do Jogo!');
            location.reload();
        }
    }

    criarBG();
    cobrinhaCriada();
    comida();

    let cobraX = snake[0].x;
    let cobraY = snake[0].y;

    if(direction == "right") cobraX += box;
    if(direction == "left") cobraX -= box;
    if(direction == "up") cobraY -= box;
    if(direction == "down") cobraY += box;

    if(cobraX != aparecerComida.x || cobraY != aparecerComida.y) {
        snake.pop();
    }
    else{aparecerComida.x = Math.floor(Math.random() * 15 + 1) * box;
        aparecerComida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let novaCabeca = {
        x: cobraX,
        y: cobraY
    }

    snake.unshift(novaCabeca);

}

let jogo = setInterval(inicioJogo, 100);

