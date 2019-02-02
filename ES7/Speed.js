/* export default */ class Speed {
    constructor (p_canvas) {
        this.canvas = p_canvas;
        this.init();
    }

    init() {
        this.speed = 1;
        this.draw();
    }

    draw() {
        this.canvas.ctx.font = "bold 20px sans-serif";
        this.canvas.ctx.fillStyle = "#086800";
        this.canvas.ctx.textAlign = "center";
        this.canvas.ctx.textBaseline = "middle";
        var centreX = 80;
        var centreY = 30;
        this.canvas.ctx.fillText("Speed : ", centreX - 30, centreY + 4);
        for (let i=1 ; i<9; i++){
            this.canvas.ctx.strokeRect(centreX + (8*i), centreY - i, 5,10 + i);
            if(i <= this.speed){
                this.canvas.ctx.fillRect(centreX + (8*i), centreY - i, 5,10 + i);
            }
        }
    }




}