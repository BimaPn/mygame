export class Input {
    constructor(gameover) {
        this.gameover = gameover;
        this.lastKey = [];
        this.touchY = '';
        this.touchTreshold = 30;
        window.addEventListener('keydown', e => {
            if ((e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") && this.lastKey.indexOf(e.key) === -1) {
                this.lastKey.push(e.key)
            } else if (e.key === "Enter" && this.lastKey.indexOf(e.key) === -1) this.lastKey.push(e.key)
        })

        window.addEventListener('keyup', e => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter") {
                this.lastKey.splice(this.lastKey.indexOf(e.key), 1)
            }
        })

        // for swipe event listener
        window.addEventListener('touchstart', e => {
            this.touchY = e.changedTouches[0].pageY;
        })
        window.addEventListener("touchmove", e => {
            const swipeDistance = e.changedTouches[0].pageY - this.touchY;

            // swipe up event
            if (swipeDistance < -this.touchTreshold && this.lastKey.indexOf('swipe up') === -1) this.lastKey.push('swipe up');
            else if (swipeDistance > this.touchTreshold && this.lastKey.indexOf('swipe down') === -1) this.lastKey.push('swipe down');


        })
        window.addEventListener("touchend", e => {

            // hapus ketika selesai di swipe
            this.lastKey.splice(this.lastKey.indexOf('swipe up'), 1)
            this.lastKey.splice(this.lastKey.indexOf('swipe down'), 1)
            console.log(this.lastKey)
        })
    }
}