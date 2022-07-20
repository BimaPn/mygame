export const states = {
    RUNNING_RIGHT: 0,
    RUNNING_LEFT: 1,
    JUMPING: 2
}
export class RunningRight {
    constructor(player) {
        this.player = player;
    }
    enter() {
        console.log('kanan')
        this.player.frameY = 0;
        this.player.speed = 10;
    }
    handleInput(input) {
        if (input === "PRESS left") this.player.setState(states.RUNNING_LEFT)
        else if (input === "REALESE right") this.player.speed = 0;
    }

}

export class RunningLeft {
    constructor(player) {
        this.player = player;
    }
    enter() {
        console.log('kiri')
        this.player.frameY = 0;
        this.player.speed = -10;
    }
    handleInput(input) {
        if (input === "PRESS right") this.player.setState(states.RUNNING_RIGHT)
        else if (input === "REALESE left") this.player.speed = 0;
    }

}