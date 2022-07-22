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
// export class Raven extends Enemies {
//     constructor(game) {
//         super();
//         this.game = game;
//         this.spriteWidth = 271;
//         this.spriteHeight = 194;
//         this.randomSize = Math.random() * .6 + .6;;
//         this.width = (this.spriteWidth / 1.2) * this.randomSize;
//         this.height = (this.spriteHeight / 1.2) * this.randomSize;
//         this.x = this.game.width;
//         this.y = Math.random() * this.game.height * 0.5;
//         this.image = document.getElementById('raven')
//         this.maxFrame = 5;
//         this.speedX = Math.random() * 7 + 7;
//         this.speedY = 0;
//         this.angle = 0;
//         this.va = Math.random() * 0.1 + 0.2;
//     }
//     update(deltaTime) {
//         super.update(deltaTime)
//         this.angle += this.va;
//         this.y += Math.sin(this.angle) * 5
//     }
//     draw(context) {
//         super.draw(context)
//     }
// }
// export class Plant extends Enemies {
//     constructor(game) {
//         super();
//         this.game = game;
//         this.spriteWidth = 60;
//         this.spriteHeight = 87;
//         this.width = this.spriteWidth * 2.2;
//         this.height = this.spriteHeight * 2.2;
//         this.x = this.game.width;
//         this.y = this.game.height - this.height - this.game.groundMargin;
//         this.image = document.getElementById('plant')
//         this.maxFrame = 1;
//         this.speedX = 0;
//         this.speedY = 0;
//     }
// }
export class Spider extends Enemies {
    constructor(game) {
        super();
        this.game = game;
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth * 1.1;
        this.height = this.spriteHeight * 1.1;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById('spider')
        this.maxFrame = 5;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 4 : -4;
    }
    update(deltaTime) {
        super.update(deltaTime)
        if (this.y >= this.game.height - this.width - this.game.groundMargin) this.speedY *= -1;
        if (this.y <= -this.height) this.markForDeleted = true;
    }
    draw(context) {
        context.beginPath();
        context.lineWidth = 5;


        context.moveTo(this.x + this.width / 2, 0);
        context.lineTo(this.x + this.width / 2, this.y + 20);
        context.stroke();
        super.draw(context)
    }

}

export class Ghost extends Enemies {
    constructor(game) {
        super();
        this.game = game;
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth / 1.2;
        this.height = this.spriteHeight / 1.2;
        this.image = document.getElementById('ghost');
        this.x = this.game.width + this.game.width / 2;
        this.y = Math.random() + (this.game.height * 0.4);
        this.speedX = Math.random() * 5 + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.angle = 0;
        this.curve = Math.random() * 5;
    }
    update(deltaTime) {
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.04
        super.update(deltaTime)
    }
    draw(context) {
        context.save();
        context.globalAlpha = 0.7;
        super.draw(context)
        context.restore();
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