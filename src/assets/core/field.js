export class Field {
    constructor(gameState, { width, height } = {}) {
        this.gameState = gameState;

        this.canvas = document.getElementById('root');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.width = this.width = width ?? 600;
        this.canvas.height = this.height = height ?? 600;
    }

    clear = () => {
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fill();

        this.terrain(true);
    }

    terrain = (enable) => {
        if(!enable) return;

        const { squareLength } = this.gameState;

        for(let i = 0; i < this.width / squareLength; i++) {
           for(let j = 0; j < this.height / squareLength; j++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = !(i % 2) ? (!(j % 2) ? '#aaa' : '#ddd') : (!(j % 2) ? '#ddd' : '#aaa');
                this.ctx.rect(i * squareLength, j * squareLength, squareLength, squareLength);
                this.ctx.fill();
           }
        }
    }
}