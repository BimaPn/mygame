class Enemies {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 60;
        this.timer = 0;
        this.interval = 1000 / this.fps;
        this.markForDeleted = false;
    }
    update(deltaTime) {
        // animation frame
        if (this.timer > this.interval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.timer = 0;
        } else this.timer += deltaTime;

        // horizontal movement
        this.x -= this.game.speed + this.speedX;
        if (this.x < -this.width) this.markForDeleted = true;

        // vertical movement
        this.y += this.speedY;
    }
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
}

export class Zombie extends Enemies {
    constructor(game) {
        super();
        this.game = game;
        this.spriteWidth = 292;
        this.spriteHeight = 410;
        this.width = this.spriteWidth / 1.6;
        this.height = this.spriteHeight / 1.6;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('zombie');
        this.maxFrame = 7;
        this.speedX = Math.random() * 1 + 2;
        this.speedY = 0;
    }
}