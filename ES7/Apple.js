/*export default */ class Apple {
    constructor(p_canvas){
        this.canvas = p_canvas;
        this.init();
    }

    init() {
        this.position = [9 , 12]; 
    }

    setNewPosition() {
        let newX = Math.round(Math.random() * (this.canvas.nbCells[0] - 1));
        let newY = Math.round(Math.random() * (this.canvas.nbCells[1] - 1));
        this.position = [newX,newY];
    }

    isOnSnake(snake) {
        let isOnSnake = false;
        for (var i=0 ; i < snake.body.length ; i++){
            if(this.position[0] === snake.body[i][0] && this.position[1] === snake.body[i][1]){
                isOnSnake = true;     
            }
        }
        return isOnSnake;
    }

    draw() {
        this.canvas.ctx.fillStyle = "#33cc33";
        this.canvas.ctx.beginPath();
        var radius = this.canvas.cellSize /2;
        var x = this.position[0] * this.canvas.cellSize + radius;
        var y = this.position[1] * this.canvas.cellSize + radius;
        this.canvas.ctx.arc(x, y, radius, 0, Math.PI*2, true);
        this.canvas.ctx.fill();
    }
}