export class Fruit {
    constructor(gameState) {
        this.gameState = gameState;

        this.width = this.height = this.gameState.squareLength;
        this.isMistery = false;
        this.chance = 0;
        this.timeout = null;

        this.generateRandomCoords();
    }

    render () {
        const { field, mode } = this.gameState;

        if(!this.isFruitExist) this.generateRandomCoords();

        field.ctx.beginPath();
        field.ctx.fillStyle = (mode === 'pointboost' && this.isMistery) ? '#45B8AC' : '#FF0000';
        field.ctx.rect(this.posX, this.posY, this.width, this.height);
        field.ctx.fill();

        if(this.chance > 8 && !this.isMistery) {
            this.isMistery = true;

            this.timeout = setTimeout(() => {
                this.isMistery = false;
                this.chance = 0;
            }, 3000);
        }
    }

    generateRandomCoords () {
        clearTimeout(this.timeout);
        this.isMistery = false;
        this.chance = Math.floor(Math.random() * 9) + 1;

        const { field, squareLength } = this.gameState;

        const posX = Math.floor(Math.random() * (field.width / squareLength)) * squareLength;
        const posY = Math.floor(Math.random() * (field.height / squareLength)) * squareLength;

        if(
            this.gameState.snake.snakeHead.posX === posX || 
            this.gameState.snake.snakeHead.posY === posY ||
            this.gameState.snake.snakeBody.some(partial => partial && partial.posX === posX && partial.posY === posY)
        ) return this.generateRandomCoords();

        this.posX = posX;
        this.posY = posY;

        this.isFruitExist = true;
    }
}