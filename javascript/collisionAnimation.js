export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = document.getElementById('boom');
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.frameX = 0;
        this.maxframe = 4;
        this.markForDeleted = false;
        this.fps = Math.random() * 15 + 10;
        this.interval = 1000 / this.fps;
        this.timer = 0;
    }
    draw(context) {
        context.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
    update(deltaTime) {
        this.x -= this.game.speed;
        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else this.timer += deltaTime;
        if (this.frameX > this.maxframe) this.markForDeleted = true;
    }
}