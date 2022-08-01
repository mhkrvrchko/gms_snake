import { Field } from "../core/field";

export class Snake {
    constructor (gameState) {
        this.gameState = gameState;

        const { field, squareLength } = this.gameState;

        this.width = this.height =  this.step = squareLength;

        this.posX = field.width / 2;
        this.posY = field.height / 2;
    }

    render () {
        const { field, fruit } = this.gameState;

        field.ctx.beginPath();
        field.ctx.fillStyle = '#000000'
        field.ctx.rect(this.posX, this.posY, this.width, this.height);
        field.ctx.fill();

        if(!this.gameState.isGameOver) this.move();

        if(this.posX === fruit.posX && this.posY === fruit.posY) {
            this.eat();
        }
    }

    move () {
        this.gameState.isGameOver = this.gameState.field.isSnakeStuck(this.posX, this.posY);

        if(this.gameState.isGameOver) {
            switch(this.gameState.direction) {
                case "Up": this.posY += this.step;
                           break;
                case "Down": this.posY -= this.step;
                           break;
                case "Left": this.posX += this.step;
                           break;
                case "Right": this.posX -= this.step;
                           break;
            }
        } else {
            switch(this.gameState.direction) {
                case "Up": this.posY -= this.step;
                           break;
                case "Down": this.posY += this.step;
                           break;
                case "Left": this.posX -= this.step;
                           break;
                case "Right": this.posX += this.step;
                           break;
            }
        }
    }

    eat () {
        const { fruit } = this.gameState;

        fruit.isFruitExist = false;
    }
}