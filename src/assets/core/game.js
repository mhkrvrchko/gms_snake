import { Snake } from "../models/snake";
import { Field } from "./field"

export class Game {
    static squareLength = 20;

    static fpsRate = 0;
    static fpsSpeed = 8;

    static field = null;
    static snake = null;

    static direction = null;

    static isInit = false;

    static init = () => {
        this.field = new Field(this);
        this.snake = new Snake(this);

        this.setUpControls();

        this.isInit = true;
    }

    static render = () => {
        if(!this.isInit) this.init();

        if(this.fpsRate % this.fpsSpeed === 0) {
            this.field.clear();
            this.snake.render();
        }
        
        this.fpsRate++;
        window.requestAnimationFrame(this.render.bind(this));
    }

    static setUpControls = () => {
        window.addEventListener('keydown', (e) => {
            const pressedKeyDirection = e.key.includes('Arrow') ? e.key.replace('Arrow', '') : null;
            
            if(
                this.direction === 'Up' && pressedKeyDirection === 'Down' ||
                this.direction === 'Down' && pressedKeyDirection === 'Up' || 
                this.direction === 'Left' && pressedKeyDirection === 'Right' || 
                this.direction === 'Right' && pressedKeyDirection === 'Left'
            ) return;

            this.direction = pressedKeyDirection;
        });
    }
}