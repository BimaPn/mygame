const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLLING: 3,
}
class State {
    constructor(state, game) {
        this.game = game;
        this.state = state;
    }
}
export class Sitting extends State {
    constructor(game) {
        super("SITTING", game);
    }
    enter() {
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
        this.game.player.frameX = 0;
    }
    handlerInput(input) {
        if (input.includes("ArrowRight") || input.includes("ArrowLeft") || input.includes("ArrowUp") || input.includes("swipe right") || input.includes("swipe left") || input.includes("swipe up")) this.game.player.setState(states.RUNNING, 1);
    }
}
export class Running extends State {
    constructor(game) {
        super("RUNNING", game);
    }
    enter() {
        // audio

        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
        this.game.player.frameX = 0;
    }
    handlerInput(input) {

        // this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width / 2, this.game.player.y + this.game.player.height));

        if (input.includes("ArrowDown") || input.includes("swipe down")) this.game.player.setState(states.SITTING, 0);
        else if (input.includes("ArrowUp") || input.includes("swipe up")) this.game.player.setState(states.JUMPING, 1);

    }
}
export class Jumping extends State {
    constructor(game) {
        super("JUMPING", game);
    }
    enter() {
        if (this.game.player.onGround()) this.game.player.vy -= 50;
        this.game.player.maxFrame = 5;
        this.game.player.frameY = 1;
        this.game.player.frameX = 0;
    }
    handlerInput(input) {
        if (this.game.player.vy > this.game.player.weight) this.game.player.setState(states.FALLLING, 1);

    }
}
export class Falling extends State {
    constructor(game) {
        super("FALLING", game);
    }
    enter() {
        // audio

        this.game.player.maxFrame = 5;
        this.game.player.frameY = 2;
        this.game.player.frameX = 0;
    }
    handlerInput(input) {
        if (this.game.player.onGround()) this.game.player.setState(states.RUNNING, 1);

    }
}

export class Hit extends State {
    constructor(game) {
        super("HIT", game);
    }
    enter() {

        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
        this.game.player.frameX = 0;
    }
    handlerInput(input) {

        if (this.game.player.frameX >= this.game.player.maxFrame && this.game.player.onGround()) this.game.player.setState(states.RUNNING, 1);
        else if (this.game.player.frameX >= this.game.player.maxFrame && !this.game.player.onGround()) this.game.player.setState(states.FALLLING, 1);
    }
}