export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 70;
        this.font = "Helvetica"
    }
    draw(context) {
        context.font = `${this.fontSize}px ${this.font}`;
        context.textAlign = 'left';
        context.fillStyle = 'black';
        // drawing
        context.fillText(`SCORE : ${this.game.score}`, 20, 70);

    }
}