class Canvas {
    constructor(p_cw = 900, p_ch = 600, p_cellSize = 30) {
        this.width = p_cw;
        this.height = p_ch;
        this.cellSize = p_cellSize;
        this.nbCells = [p_cw / p_cellSize, p_ch / p_cellSize ];
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.position = "absolute";
        this.canvas.style.display = "block";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.marginLeft = "calc((100% - "+ p_cw + "px) / 2 )";
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        //this.color = Math.floor(Math.random() * Math.floor(255));
    }

    // init() {
    //     //this.color = Math.floor(Math.random() * Math.floor(255));
    // }

    // draw() {
    //     //this.ctx.clearRect(0, 0, this.width, this.height);
    //     //this.ctx.fillStyle = `rgb(${this.color}, 50 , ${this.color})`;
    //     //this.ctx.fillRect(0,0, 200, 200);
    // }
}
