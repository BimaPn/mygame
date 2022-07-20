export function drawStatusText(context, gameWidth, gameHeight, score, gameover) {

    context.textAlign = 'left';

    context.font = "60px Helvetica";
    context.fillStyle = 'black';
    context.fillText("Score : " + score, 12, 52)
    context.fillStyle = 'white';
    context.fillText("Score : " + score, 10, 50)

    // ketika gameover
    if (gameover) {
        context.font = "80px Helvetica";
        context.textAlign = 'center';
        context.fillStyle = 'black';
        context.fillText("GAMEOVER ,swipe down atau enter buat restart :)", (gameWidth / 2) + 2, ((gameHeight / 2) - 200) + 2)
        context.fillStyle = 'white';
        context.fillText("GAMEOVER ,swipe down atau enter buat restart :)", gameWidth / 2, (gameHeight / 2) - 200)
    }
}