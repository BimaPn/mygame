import { Background } from "./background.js";
import { Ghost, Spider, Zombie } from "./enemies.js";
import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { UI } from "./UI.js";

window.addEventListener('load', () => {

    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    // fullscreen
    // fullscreen
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`ERROR,gak bisa mode full screen :(`)
            });
        } else {
            document.exitFullscreen();
        }
    }
    const fullscreenButton = document.getElementById('fullscreen');
    fullscreenButton.addEventListener('click', toggleFullScreen)

    // game class
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 160;
            // property input
            this.input = new InputHandler(this);
            // speed dalam game
            this.speed = 0;
            this.maxSpeed = 5;
            // property untuk enemies
            this.enemies = [];
            this.enemyTypes = ['spider', 'ghost', 'zombie'];
            // property untuk particles
            this.particles = [];
            this.maxParticles = 20;
            // collision animation
            this.collisions = [];
            // property untuk player
            this.player = new Player(this);
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            // property untuk background
            this.backGround = new Background(this)
                // audio
            this.backSound = new Audio('backsound2.mp3');
            this.backSound.loop = true;
            this.jumpSound = new Audio('jump.mp3');
            this.fireSound = new Audio('fire.mp3')
            this.hitSound = new Audio('hit.wav');
            this.explosionSound = new Audio('explosion.wav')
                // frame rate dan score
            this.timer = 0;
            this.inteval = Math.random() * 3000 + 3000;
            this.UI = new UI(this);
            this.score = 0;
            this.debug = false;
        }
        update(deltaTime) {
            // random time saat musuh spawn
            this.inteval = Math.random() * 3000 + 3000;

            // update untuk background
            this.backGround.update(deltaTime);
            // update untuk player
            this.player.update(this.input.keys, deltaTime)

            // enemies handler
            if (this.timer > this.inteval) {
                this.addEnemy();
                this.timer = 0;
            } else {
                this.timer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                    if (enemy.markForDeleted) this.enemies.splice(this.enemies.indexOf(enemy), 1);
                })
                // particle handler
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markForDeleted) this.particles.splice(index, 1);
                this.particles.length = this.maxParticles
            })

            // collison animation handler
            this.collisions.forEach((col, index) => {
                col.update(deltaTime);

                if (col.markForDeleted) {
                    this.collisions.splice(index, 1);
                }
            });
        }
        draw(context) {
            // draw untuk background
            this.backGround.draw(context)
                // draw untuk enemies
            this.enemies.forEach(enemy => enemy.draw(context));
            // draw untuk player
            this.player.draw(context)
                // draw untuk particles
            this.particles.forEach(particle => particle.draw(context))
                // draw untuk collision animation
            this.collisions.forEach(col => col.draw(context));
            // draw untuk UI score
            this.UI.draw(context)
        }
        addEnemy() {
            // generate random enemy
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            // jika random enemy plant dan player bergerak,maka spawn musuh ber type plant
            // if (randomEnemy == 'plant' && this.speed > 0) this.enemies.push(new Plant(this));
            // jika random enemy spider dan player bergerak,maka spawn musuh ber type spider
            if (randomEnemy == 'spider' && this.speed > 0) this.enemies.push(new Spider(this));
            // jika random enemy raven,maka spawn musuh ber type raven
            // if (randomEnemy == 'raven') this.enemies.push(new Raven(this));
            // ghost
            if (randomEnemy == 'ghost') {
                for (let i = 0; i < Math.random() * 2 + 1; i++) {
                    this.enemies.push(new Ghost(this));
                }
            }
            // zombie
            if (randomEnemy == 'zombie' && this.speed > 0) this.enemies.push(new Zombie(this));
        }
    }
    // declaration game class
    const game = new Game(canvas.width, canvas.height);
    // animation
    let lastTime = 0;

    function animate(timeStamp) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // fps
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime)
        game.draw(context);
        requestAnimationFrame(animate)
    }
    animate(0)
})