// import Game from "./Game.js";  // with Es6/7 compatible

window.onload = () => {

    const game = new Game(100); //Create game object with framerate (ms) in constructor
    game.update(); // launch loop game

    document.onkeydown = function handleKey(e) {
        let key = e.keyCode;
        switch(key){
            case 37:
                game.snake.setDirection("left");
                break;
            case 38:
                game.snake.setDirection("up");
                break;
            case 39:
                game.snake.setDirection("right");
                break;
            case 40:
                game.snake.setDirection("down");
                break;
            case 32:
                game.restart();
                return;
            default:
                return;
        }
    }
}