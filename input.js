export class InputHandler {
    constructor(game) {
        this.keys = [];
        this.touchX = '';
        this.touchY = '';
        this.touchTreshold = 30;
        this.game = game;
        window.addEventListener('keydown', e => {
            if ((e.key === "ArrowRight" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowDown" ||
                    e.key === "Enter") && this.keys.indexOf(e.key) == -1) {
                this.keys.push(e.key)
            } else if (e.key === "d") this.game.debug = !this.game.debug;
            this.game.backSound.play();
        })

        window.addEventListener('keyup', e => {
            if (e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "Enter") {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }

        })

        // for swipe event listener
        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
            this.game.backSound.play();
        })
        window.addEventListener("touchmove", e => {
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;


            // swipe up event
            if (swipeDistanceY < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
            // swipe down event
            else if (swipeDistanceY > this.touchTreshold && this.keys.indexOf('swipe down') === -1) {
                this.keys.push('swipe down');
            }
            // swipe right event
            else if (swipeDistanceX > this.touchTreshold && this.keys.indexOf('swipe right') === -1) this.keys.push('swipe right');
            // swipe left event
            else if (swipeDistanceX < -this.touchTreshold && this.keys.indexOf('swipe left') === -1) this.keys.push('swipe left');

            console.log(this.keys)
        })
        window.addEventListener("touchend", e => {

            // hapus ketika selesai di swipe
            this.keys.splice(this.keys.indexOf('swipe up'), 1)
            this.keys.splice(this.keys.indexOf('swipe down'), 1)
            this.keys.splice(this.keys.indexOf('swipe right'), 1)
            this.keys.splice(this.keys.indexOf('swipe left'), 1)
            console.log(this.keys)
        })
    }
}