/*export default */ class Score {
    constructor (p_canvas) {
        this.canvas = p_canvas;
        this.bestScore = 0;
        this.init();
    }

    init() {
        this.score = 0;
        this.draw();
    }

    draw() {
        this.canvas.ctx.font = "bold 200px sans-serif";
        this.canvas.ctx.fillStyle = "#4286f4";
        this.canvas.ctx.textAlign = "center";
        this.canvas.ctx.textBaseline = "middle";
        var centreX = this.canvas.width / 2;  //this.canvas.ctx.canvas.clientWidth / 2;
        var centreY = this.canvas.height / 2; //this.canvas.ctx.canvas.clientHeight / 2;
        this.canvas.ctx.fillText(this.score.toString(), centreX, centreY);
    }

}