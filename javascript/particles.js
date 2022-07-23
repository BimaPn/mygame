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
export class Fire extends Particles {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.size = Math.random() * 150 + 80;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.image = document.getElementById('fire');
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }
    update() {
        super.update()
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        // context.drawImage(this.image, this.x, this.y, this.size, this.size);
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();


    }
}
export class Splash extends Particles {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 200 + 100;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.speedX = Math.random() * 16 - 8;
        this.speedY = Math.random() * 6 + 4;
        this.image = document.getElementById('fire');
        this.gravity = 0;
    }
    update() {
        super.update()
        this.gravity += 0.4;
        this.y += this.gravity;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}