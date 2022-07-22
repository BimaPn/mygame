class Particles {
    constructor(game) {
        this.game = game;
        this.markForDeleted = false;
    }
    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if (this.size < 0.5) this.markForDeleted = true;
    }
}

export class Dust extends Particles {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.size = Math.random() * 30 + 30;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = "rgba(255,255,255,0.2)";
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();

    }
}