import { background1, background2, background3, background4, background5, Layers } from "./background.js";
import { addEnemies } from "./enemies.js";
import { drawStatusText } from "./drawText.js";

import { Player } from "./player.js";

// window.addEventListener('load', () => {
document.querySelector('h1').style.display = "none";

// audio
const backsound = document.getElementById('backsound')
backsound.loop = true;

const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;


// gameover
let gameover = false;

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


// input
class Input {
    constructor() {

        this.lastKey = [];
        this.touchX = '';
        this.touchY = '';
        this.touchTreshold = 30;
        window.addEventListener('keydown', e => {
            if ((e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") && this.lastKey.indexOf(e.key) === -1) {
                backsound.play();
                this.lastKey.push(e.key)
            } else if (e.key === "Enter" && gameover) restartGame();

        })

        window.addEventListener('keyup', e => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
                this.lastKey.splice(this.lastKey.indexOf(e.key), 1)
            }
        })

        // for swipe event listener
        window.addEventListener('touchstart', e => {
            backsound.play();
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
        })
        window.addEventListener("touchmove", e => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;

            // swipe up event
            if (swipeDistanceY < -this.touchTreshold && this.lastKey.indexOf('swipe up') === -1) this.lastKey.push('swipe up');
            // swipe down event
            else if (swipeDistanceY > this.touchTreshold && this.lastKey.indexOf('swipe down') === -1) {
                this.lastKey.push('swipe down');
                if (gameover) restartGame();
            }
            // swipe right event
            else if (swipeDistanceX > this.touchTreshold && this.lastKey.indexOf('swipe right') === -1) this.lastKey.push('swipe right');
            // swipe left event
            else if (swipeDistanceX < -this.touchTreshold && this.lastKey.indexOf('swipe left') === -1) this.lastKey.push('swipe left');


        })
        window.addEventListener("touchend", e => {

            // hapus ketika selesai di swipe
            this.lastKey.splice(this.lastKey.indexOf('swipe up'), 1)
            this.lastKey.splice(this.lastKey.indexOf('swipe down'), 1)
            this.lastKey.splice(this.lastKey.indexOf('swipe right'), 1)
            this.lastKey.splice(this.lastKey.indexOf('swipe left'), 1)
        })
    }
}
const inputHandler = new Input();
// background
const layers = [new Layers(background1, canvas.width, canvas.height, .5), new Layers(background2, canvas.width, canvas.height, .05), new Layers(background3, canvas.width, canvas.height, .8), new Layers(background4, canvas.width, canvas.height, .4), new Layers(background5, canvas.width, canvas.height, 1.8)]

// player
const player = new Player(canvas.width, canvas.height)
    // enemies
let enemies = [];
const addEnemy = new addEnemies(canvas.width, canvas.height, context);

// restart function
function restartGame() {
    // player.restart();
    layers.forEach(object => {
        object.restart();
    })
    addEnemy.restart();
    // backsound.play();
    gameover = false;
    animate(0);
}

// animation
let lastTime = 0;
let timer = 0;
const inteval = Math.random() * 2000 + 1000;

function animate(timeStamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // background
    layers.forEach(layer => {
        layer.update();
        layer.draw(context)
    })

    // adding enemies
    addEnemy.update(deltaTime)
    addEnemy.draw();

    enemies = addEnemy.enemies;

    // player
    player.update(inputHandler.lastKey, deltaTime, enemies)
    player.draw(context)
    gameover = player.gameover;

    // display score
    drawStatusText(context, canvas.width, canvas.height, addEnemy.score, gameover)
    if (inputHandler.lastKey.indexOf('Enter') > -1) {
        console.log('klink')
    }

    if (!gameover) requestAnimationFrame(animate);

}
animate(0)
    // })
window.onload = function() {

}