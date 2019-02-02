/*export default */ class Snake {
    constructor(p_canvas) {
        this.canvas = p_canvas;
        this.init();
    }

    init() {
        this.body = [[9,8],[8,8],[7,8]];
        this.direction = "right";
        this.ateApple = false;
    }

    setDirection (newDirection) {
        let allowedDirections;
        switch(this.direction){
            case "left":
            case "right":
                allowedDirections=["up","down"];
                break;
            case "down":
            case "up":
                allowedDirections=["left","right"];
                break;  
           default:
                throw("invalid direction");
        }
        if (allowedDirections.includes(newDirection)){
            this.direction = newDirection;
        }
    }

    advance() {
        var nextPosition = this.body[0].slice();
        switch(this.direction){
            case "left":
                nextPosition[0] -= 1;
                break;
            case "right":
                nextPosition[0] += 1;
                break;
            case "down":
                nextPosition[1] += 1;
                break;
            case "up":
                nextPosition[1] -= 1;
                break;
            default:
                throw("invalid direction");
        }
        if (this.body.length < 50){
            this.body.unshift(nextPosition);
        }
        if (!this.ateApple)
            this.body.pop();
        else
            this.ateApple = false;
    }

    checkCollision() {
        let wallCollision = false;
        let snakeCollision = false;
        let head = this.body[0];
        let lombric = this.body.slice(1);
        if ((head[0] < 0 || head[0] > this.canvas.nbCells[0] - 1) || (head[1] < 0 || head[1] > this.canvas.nbCells[1] - 1)) {
            wallCollision = true;
        }
        for (var i=0 ; i<lombric.length ; i++) {
            if (head[0] === lombric[i][0] && head[1] === lombric[i][1])
                snakeCollision = true;
        }
        
        return wallCollision || snakeCollision; 
    }

    isEatingApple (apple){
        var head = this.body[0];
        if (head[0] === apple.position[0] && head[1] === apple.position[1])
            return true;
        else
            return false;
    }

    draw() {
        let color = "#990000";
        let midCellSize = this.canvas.cellSize / 2;
        this.canvas.ctx.fillStyle = color;
        let x = this.body[0][0] * this.canvas.cellSize + midCellSize;
        let y = this.body[0][1] * this.canvas.cellSize + midCellSize;
        this.canvas.ctx.beginPath();
        this.canvas.ctx.arc(x, y, midCellSize, midCellSize, Math.PI * 2, true);
        x = this.body[0][0] * this.canvas.cellSize
        y = this.body[0][1] * this.canvas.cellSize
        let positionEyes = [[x,y],[x,y]]; 
        switch (this.direction) {
            case "left":
                this.canvas.ctx.fillRect(x + midCellSize, y, midCellSize, this.canvas.cellSize );
                positionEyes[0][0] += midCellSize;  
                positionEyes[0][1] += this.canvas.cellSize / 1.4;
                positionEyes[1][0] += midCellSize;  
                positionEyes[1][1] += this.canvas.cellSize / 4;
                break;
            case "right":
                this.canvas.ctx.fillRect(x, y, midCellSize, this.canvas.cellSize );
                positionEyes[0][0] += midCellSize;  
                positionEyes[0][1] += this.canvas.cellSize / 4;
                positionEyes[1][0] += midCellSize;  
                positionEyes[1][1] += this.canvas.cellSize / 1.4;
                break;
            case "up":
                this.canvas.ctx.fillRect(x, y + midCellSize, this.canvas.cellSize, midCellSize);
                positionEyes[0][0] += this.canvas.cellSize / 4;  
                positionEyes[0][1] += midCellSize;
                positionEyes[1][0] += this.canvas.cellSize / 1.4;  
                positionEyes[1][1] += midCellSize;
                break;
            case "down":
                this.canvas.ctx.fillRect(x, y, this.canvas.cellSize, midCellSize);
                positionEyes[0][0] += this.canvas.cellSize / 1.4;  
                positionEyes[0][1] += midCellSize;
                positionEyes[1][0] += this.canvas.cellSize / 3.8;  
                positionEyes[1][1] += midCellSize;
                break;
        }
        this.canvas.ctx.fill();
        //Drawing body
        for (let i=1; i < this.body.length ; i++){
            
            x = this.body[i][0] * this.canvas.cellSize;
            y = this.body[i][1] * this.canvas.cellSize;
            this.canvas.ctx.fillRect(x, y, this.canvas.cellSize, this.canvas.cellSize);
        }
        // Drawing Eyes
        this.canvas.ctx.beginPath();
        this.canvas.ctx.fillStyle = "#ffffff";
        this.canvas.ctx.arc(positionEyes[0][0], positionEyes[0][1], this.canvas.cellSize / 6, midCellSize, Math.PI * 2, true);
        this.canvas.ctx.arc(positionEyes[1][0], positionEyes[1][1], this.canvas.cellSize / 6, midCellSize, Math.PI * 2, true);
        this.canvas.ctx.fill();
        this.canvas.ctx.beginPath();
        this.canvas.ctx.fillStyle = "#000000";
        this.canvas.ctx.arc(positionEyes[0][0], positionEyes[0][1], this.canvas.cellSize / 12, this.canvas.cellSize / 2, Math.PI * 2, true);
        this.canvas.ctx.arc(positionEyes[1][0], positionEyes[1][1], this.canvas.cellSize / 12, this.canvas.cellSize / 2, Math.PI * 2, true);
        this.canvas.ctx.fill();
    }
}