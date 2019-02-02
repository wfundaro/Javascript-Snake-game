// import Snake from "./Snake.js";  // with Es6/7 compatible
// import Score from "./Speed.js";  // with Es6/7 compatible
// import Score from "./Score.js";  // with Es6/7 compatible
// import Apple from "./Apple.js";  // with Es6/7 compatible

/*export default */class Game {
    constructor(p_framerate) {
        this.backgroundLayer = new Canvas();
        this.backgroundLayer.canvas.style.border = "30px solid #294745";
        this.backgroundLayer.canvas.style.backgroundColor = "#ffd975";
        this.gameLayer = new Canvas();
        this.gameLayer.canvas.style.padding = "30px";
        this.uiLayer = new Canvas();
        this.uiLayer.canvas.style.padding = "30px";
        this.snake = new Snake(this.gameLayer);
        this.score = new Score(this.uiLayer);
        this.apple = new Apple(this.gameLayer);
        this.speed = new Speed(this.uiLayer);
        this.backgroundLayer.canvas.style.zIndex = 1;
        this.uiLayer.canvas.style.zIndex = 2;
        this.gameLayer.canvas.style.zIndex = 3;
        this.framerate = p_framerate;
        this.initFramerate = p_framerate;
        this.endGame = false;
        this.scoreChangeFramerate = 5;
    }

    restart(){
        if (this.endGame == true) {
            this.endGame = false;
            this.framerate = this.initFramerate;
            this.score.init();
            this.speed.init();
            this.snake.init();
            this.apple.init();
            clearTimeout(this.timeOut);
            this.update();
        }
    }

    update() {
        this.snake.advance();
        if (this.snake.checkCollision()){
            this.gameOver();
        } else {
            if (this.snake.isEatingApple(this.apple)){
                this.score.score++;
                if (this.score.score % this.scoreChangeFramerate == 0 && this.speed.speed < 8){
                    this.framerate -= 10;
                    this.speed.speed++;
                }
                this.uiLayer.ctx.clearRect(0, 0, this.uiLayer.canvas.width, this.uiLayer.canvas.height);
                this.speed.draw();
                this.score.draw();
                this.snake.ateApple = true;
                do {
                    this.apple.setNewPosition(); 
                } while(this.apple.isOnSnake(this.snake));
            }
            this.gameLayer.ctx.clearRect(0, 0, this.uiLayer.canvas.width, this.uiLayer.canvas.height);
            this.snake.draw();
            this.apple.draw();
            this.timeOut = setTimeout(this.update.bind(this), this.framerate);
         }
    }

    gameOver() {
        this.endGame = true;
        if (this.score.bestScore < this.score.score) {
            this.score.bestScore = this.score.score;
        }
        this.uiLayer.ctx.clearRect(0, 0, this.uiLayer.canvas.width, this.uiLayer.canvas.height);
        this.gameLayer.ctx.clearRect(0, 0, this.uiLayer.canvas.width, this.uiLayer.canvas.height);
        this.gameLayer.ctx.save();
        this.gameLayer.ctx.font = "bold 70px sans-serif";
        this.gameLayer.ctx.fillStyle = "#000";
        this.gameLayer.ctx.textAlign = "center";
        this.gameLayer.ctx.textBaseline = "middle";
        this.gameLayer.ctx.strokeStyle = "white";
        this.gameLayer.ctx.lineWidth = 5;
        let centreX = this.gameLayer.width / 2;
        let centreY = this.gameLayer.height / 2;
        this.gameLayer.ctx.strokeText("Game Over", centreX, centreY - 180);
        this.gameLayer.ctx.fillText("Game Over", centreX, centreY - 180);
        this.gameLayer.ctx.font = "bold 30px sans-serif";
        this.gameLayer.ctx.strokeText("Score : " + this.score.score, centreX, centreY - 120);
        this.gameLayer.ctx.fillText("Score : " + this.score.score, centreX, centreY - 120);
        this.gameLayer.ctx.strokeText("Best Score : " + this.score.bestScore, centreX, centreY - 80);
        this.gameLayer.ctx.fillText("Best Score : " + this.score.bestScore, centreX, centreY - 80);
        this.gameLayer.ctx.strokeText("Press Space Bar to restart", centreX, centreY);
        this.gameLayer.ctx.fillText("Press Space Bar to restart", centreX, centreY);
        this.gameLayer.ctx.restore();
    }
}