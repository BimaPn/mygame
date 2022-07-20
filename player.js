import { RunningLeft, RunningRight } from "./state.js";


export class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('player');
        this.states = [new RunningRight(this), new RunningLeft(this)];
        this.currentState = this.states[0];
        this.spriteWidth = 200;
        this.spriteHeight = 200;
        this.width = this.spriteWidth * 1.2;
        this.height = this.spriteHeight * 1.2;
        this.groundMargin = 120;
        this.x = this.gameWidth / 2 - this.width;
        this.y = this.gameHeight - this.height - this.groundMargin;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 8;
        this.speed = 0;
        this.vy = 0;
        this.weight = 2;
        this.frameTimer = 0;
        this.interval = 1000 / 60;
        this.gameover = false
    }
    update(key, deltaTime, enemies) {
        // collasion event
        enemies.forEach(enemy => {
            const dx = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
            const dy = (enemy.y + enemy.height / 2) - (this.y + (this.height / 2 + 25))
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < enemy.width / 3 + this.width / 3) {
                this.gameover = true;
            }
        });
        // sprite animation
        if (this.frameTimer > this.interval) {
            if (this.frameX >= this.maxFrame) {
                this.frameX = 0;
            } else {
                this.frameX++;
            }
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime;
        }

        if (key.indexOf('ArrowRight') > -1) {
            this.frameY = 0;
            this.maxFrame = 8;
            this.speed = 10;
        } else if (key.indexOf('ArrowLeft') > -1) {
            this.frameY = 0;
            this.maxFrame = 8;
            this.speed = -10;
        } else if (key.indexOf('swipe right') > -1) {
            this.frameY = 0;
            this.maxFrame = 8;
            this.speed = 30;
        } else if (key.indexOf('swipe left') > -1) {
            this.frameY = 0;
            this.maxFrame = 8;
            this.speed = -30;
        } else if (key.indexOf('ArrowUp') > -1 || key.indexOf('swipe up') > -1) {
            this.frameY = 1;
            this.maxFrame = 6;
            if (this.onGround()) {
                this.vy -= 40
            }
        } else {
            this.speed = 0;
        }

        if (this.onGround()) this.frameY = 0

        // horizontal movement 
        this.x += this.speed;
        if (this.x <= 0) this.x = 0;
        else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight
        } else {
            this.vy = 0
        }
        if (this.y > this.gameHeight - this.height - this.groundMargin) this.y = this.gameHeight - this.height - this.groundMargin

    }
    draw(context) {
        context.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);


        // untuk membuat lingkaran(circle collasion)
        // context.strokeStyle = 'white';
        // context.beginPath();
        // context.arc(this.x + (this.width / 2), this.y + (this.height / 2 + 25), this.width / 3.5, 0, Math.PI * 2);
        // context.stroke();
    }

    onGround() {
        return this.y >= this.gameHeight - this.height - this.groundMargin;
    }
    restart() {
        this.x = this.gameWidth / 2 - this.width;
        this.y = this.gameHeight - (this.height + 160);
        this.frameY = 0;
        this.maxFrame = 8;
        this.gameover = false;
    }
}