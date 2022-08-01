export class Fruit {
    constructor(gameState) {
        this.gameState = gameState;

        this.width = this.height = this.gameState.squareLength;

        this.generateRandomCoords();
    }

    render () {
        const { field } = this.gameState;

        if(!this.isFruitExist) this.generateRandomCoords();

        field.ctx.beginPath();
        field.ctx.fillStyle = '#FF0000'
        field.ctx.rect(this.posX, this.posY, this.width, this.height);
        field.ctx.fill();
    }

    generateRandomCoords () {
        const { field, squareLength } = this.gameState;

        const posX = Math.floor(Math.random() * (field.width / squareLength)) * squareLength;
        const posY = Math.floor(Math.random() * (field.height / squareLength)) * squareLength;

        if(this.gameState.snake.posX === posX || this.gameState.snake.posY === posY) return this.generateRandomCoords();

        this.posX = posX;
        this.posY = posY;

        this.isFruitExist = true;
    }
}