import { Field } from "../core/field";

export class Snake {
    constructor (gameState) {
        this.gameState = gameState;

        const { field, squareLength } = this.gameState;

        this.width = squareLength;
        this.height = squareLength;
        this.step = squareLength;

        this.posX = field.width / 2;
        this.posY = field.height / 2;
    }

    render () {
        const { field } = this.gameState;

        field.ctx.beginPath();
        field.ctx.fillStyle = '#FF0000'
        field.ctx.rect(this.posX, this.posY, this.width, this.height);
        field.ctx.fill();

        this.move();
    }

    move () {
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

    grow () {

    }

    eat () {
        
    }
}