import { CollisionAnimation } from "./collisionAnimation.js";
import { Diving, Falling, Hit, Jumping, Rolling, Running, Sitting } from "./states.js"
export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 573;
        this.spriteHeight = 523;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 2;
        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.timer = 0;
        this.currentState = null;
    }
    update(input, deltaTime) {
        // untuk meng handle input
        this.currentState.handlerInput(input);
        // untuk cek collasion
        this.checkCollasion();

        // animation frame
        if (this.timer > this.interval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }


        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else if (input.includes('swipe right')) this.speed = this.maxSpeed + 20;
        else if (input.includes('swipe left')) this.speed = -this.maxSpeed * 3;
        else this.speed = 0;
        // cek kondisi ketika player keluar layar
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // vertical bondaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
    }
    draw(context) {
        // jika mode debug aktif,maka gambar kotak bergaris disekeliling object(untuk collasion detection)
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);

        context.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollasion() {
        // rectangle collasion
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                // collasion detected
                this.game.hitSound.pause();
                this.game.hitSound.currentTime = 0;
                this.game.hitSound.play();
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2))
                this.game.enemies.splice(this.game.enemies.indexOf(enemy), 1)
                if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score += 1;
                } else {
                    this.setState(6, 0);
                }
            }
        });
    }
}