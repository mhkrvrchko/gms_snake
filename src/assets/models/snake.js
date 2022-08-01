import { Field } from "../core/field";

export class Snake {
    constructor (gameState) {
        this.gameState = gameState;

        const { field, squareLength } = this.gameState;

        this.width = this.height =  this.step = squareLength;

        this.snakeHead = {
            type: "HEAD",
            posX: field.width / 2, 
            posY: field.height / 2
        };

        this.snakeBody = [];
    }

    render () {
        const { field, fruit } = this.gameState;

        [this.snakeHead, ...this.snakeBody].forEach(partial => {
            const { posX, posY } = partial;

            if(partial.type === 'HEAD') {
                field.ctx.beginPath();
                field.ctx.fillStyle = '#000000';
                field.ctx.rect(posX, posY, this.width, this.height);
                field.ctx.fill();

                field.ctx.beginPath();
                field.ctx.fillStyle = this.gameState.isGameOver ? '#ff0000' : '#ffffff';
                field.ctx.arc(posX + 5, posY + 5, 3, 0, 2 * Math.PI);
                field.ctx.fill();

                field.ctx.beginPath();
                field.ctx.arc(posX + 15, posY + 5, 3, 0, 2 * Math.PI);
                field.ctx.fill();
            } else {
                field.ctx.beginPath();
                field.ctx.fillStyle = '#000000';
                field.ctx.rect(posX, posY, this.width, this.height);
                field.ctx.fill();
            }
        })

        if(!this.gameState.isGameOver) this.move();

        if(this.snakeHead.posX === fruit.posX && this.snakeHead.posY === fruit.posY) this.eat();
    }

    move () {
        if(
            this.gameState.field.isSnakeStuck(this.snakeHead.posX, this.snakeHead.posY) 
        ) return this.dead();
        
        this.save();

        if(this.snakeBody.length) {
            const reversedSnakeBody = this.snakeBody.slice().reverse();

            reversedSnakeBody.forEach((partial, index) => {
                const nextPartial = index === reversedSnakeBody.length - 1 ? this.snakeHead : reversedSnakeBody[index + 1];

                partial.posX = nextPartial.posX;
                partial.posY = nextPartial.posY;
            });
        }

        switch(this.gameState.direction) {
            case "Up": this.snakeHead.posY -= this.step;
                        break;
            case "Down": this.snakeHead.posY += this.step;
                        break;
            case "Left": this.snakeHead.posX -= this.step;
                        break;
            case "Right": this.snakeHead.posX += this.step;
                        break;
        }

       if(this.snakeBody.some(partial => this.snakeHead.posX === partial.posX && this.snakeHead.posY === partial.posY)) return this.dead();
    }

    eat () {
        const { fruit } = this.gameState;

        this.snakeBody.push({
            type: "BODY",
            posX: fruit.posX, 
            posY: fruit.posY
        });

        fruit.isFruitExist = false;
    }

    dead () {
        [this.snakeHead, this.snakeBody] = this.saveState;
        this.gameState.isGameOver = true;
    }

    save () {
        const snakeHeadCopy = Object.assign({}, this.snakeHead);
        const snakeBodyCopy = this.snakeBody.map(partial => Object.assign({}, partial));

        this.saveState = [snakeHeadCopy, snakeBodyCopy];
    }
}