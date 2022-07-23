let gameSpeed = 5;
export class Layers {
    constructor(image, gameWidth, gameHeight, speedModifier) {
        this.image = image;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = 0;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;

        if (this.x <= -this.gameWidth) this.x = 0;
        this.x -= this.speed;
    }
    draw(context) {
        context.drawImage(this.image, this.x, 0, this.gameWidth, this.gameHeight);
        context.drawImage(this.image, this.x + this.gameWidth, 0, this.gameWidth, this.gameHeight);

    }
    restart() {
        this.x = 0;
    }
}

// image
export const background1 = document.getElementById('layer1');
export const background2 = document.getElementById('layer2');
export const background3 = document.getElementById('layer3');
export const background4 = document.getElementById('layer4');
export const background5 = document.getElementById('layer5');