let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;//tamanho do quadradinho
let snake = []; //variavel que recebe um arrays
snake[0] = {
    x: 0 * box, //posição inicial da cobrinha eixo X 
    y: 0 * box  //posição inicial da cobrinha eixo Y
}

let direction = "right";//direção inicial da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){ //função que cria o tabuleiro
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);//Posição de X e Y, Altura e Largura do box

}
function criarCobra(){//função que cria cobra
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}



document.addEventListener('keydown', update); //comando de movimento,no botão do teclado (Evento)

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right"; //numeros que correspondem a posição da tecla 
    if(event.keyCode == 40 && direction != "up") direction = "down";


}

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0; //define o retorno da cobrinha ao sair do tabuleiro
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y ){
            clearInterval(jogo);
            alert('Game Over clique em "OK" e recarregue a página para jogar novamente');
        }
    }

    criarBG();
    criarCobra();
    drawFood();    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;     //direção para onde a cobrinha deve seguir
    if(direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop(); //retira o ultimo elemento do nosso arrays
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }
    let newHead = { //define a cabeça da cobra
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}
let jogo = setInterval(iniciarJogo, 200); //reinica o jogo acada ms

