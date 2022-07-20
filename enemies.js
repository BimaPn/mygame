let score = 0;

// membuat enemy
export class Enemies {
    constructor(gameWidth, gameHeight, player) {
        this.player = player
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.frameX = 0;
        this.speedX = Math.random() * .4 + .3;
        this.fps = 60;
        this.timer = 0;
        this.Spriteinterval = 1000 / this.fps;
        this.markForDeleted = false;
    }
    update(deltaTime) {
        // sprite animation
        if (this.timer > this.Spriteinterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.timer = 0;
        } else this.timer += deltaTime;

        // jika musuh sudah ada diujung layar,maka hapus dan tambahkan score
        if (this.x < 0 - this.width) {
            this.markForDeleted = true;
            score++;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

}
export class Worm extends Enemies {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth / 1.3;
        this.height = this.spriteHeight / 1.3;
        this.image = document.getElementById('enemy1');
        this.groundMargin = 110;
        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height - this.groundMargin;
        this.maxFrame = 5;
    }
    update(deltaTime) {
        this.x -= this.speedX * deltaTime;
        super.update(deltaTime)
    }
    draw(context) {
        context.strokeStyle = 'white';
        super.draw(context)
            // untuk membuat lingkaran(circle collasion)
            // context.beginPath();
            // context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 3, 0, Math.PI * 2);
            // context.stroke();


    }
}

export class Ghost extends Enemies {
    constructor(gameWidth, gameHeight) {
        super(gameWidth, gameHeight)
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth / 1.2;
        this.height = this.spriteHeight / 1.2;
        this.image = document.getElementById('enemy2');
        this.x = this.gameWidth;
        this.y = Math.random() + (this.gameHeight * 0.3);
        this.maxFrame = 5;
        this.angle = 0;
        this.curve = Math.random() * 5;
    }
    update(deltaTime) {
        this.x -= this.speedX * deltaTime;
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.04
        super.update(deltaTime)
    }
    draw(ctx) {
        ctx.save();

        ctx.globalAlpha = 0.7;
        super.draw(ctx)

        // untuk membuat lingkaran(circle collasion)
        // ctx.strokeStyle = 'white';
        // ctx.beginPath();
        // ctx.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 3, 0, Math.PI * 2);
        // ctx.stroke();


        ctx.restore();

    }
}

// untuk menambah enemy
export class addEnemies {
    constructor(width, height, context) {
        this.ctx = context;
        this.gameWidth = width;
        this.gameHeight = height;
        this.enemies = [];
        this.score = score;
        this.timer = 0;
        this.interval = Math.random() * 1000 + 3000;
        this.enemyTypes = ['worm', 'ghost'];
    }
    update(deltaTime) {
        if (this.timer > this.interval) {
            this.addNewEnemies();
            this.timer = 0;
            // console.log(this.score)
        } else {
            this.timer += deltaTime;
        }
        this.enemies = this.enemies.filter(object => !object.markForDeleted)

        // untuk menghitung score
        this.score = score;

        this.enemies.forEach(object => object.update(deltaTime))
    }
    draw() {
        this.enemies.forEach(object => object.draw(this.ctx))
    }
    addNewEnemies() {
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        if (randomEnemy == 'worm') this.enemies.push(new Worm(this.gameWidth, this.gameHeight));
        else if (randomEnemy == 'ghost') {
            for (let i = 0; i < 3; i++) {
                this.enemies.push(new Ghost(this.gameWidth, this.gameHeight));
            }
        }
        this.enemies.sort((a, b) => a.y - b.y);
    }
    restart() {
        score = 0;
        this.enemies = [];
    }
}