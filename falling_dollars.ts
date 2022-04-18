import {DollarExplosion} from "./models/dollar-explosion";

const canvas = document.getElementById('dotsCanvas') as HTMLCanvasElement;
const context = canvas.getContext("2d");
const dollarExploder = DollarExplosion.generate(10, 640);

const refreshDollars = () => {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fillRect(0, 0, 640, 480);
    dollarExploder.dollars.forEach((dollar) => {
        context.fillStyle = `rgba(0, 0, 0, ${dollar.opacity})`;
        drawCircle(dollar.location.x, dollar.location.y, 20);
    });
};

const drawCircle = (x: number, y: number, radius: number) => {
    context.strokeStyle = 'rgba(0, 146, 216, 1)';
    context.fillStyle = 'rgba(0, 146, 216, 1)';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    drawDollaSign(x - radius/2, y + radius/2);
};

const drawDollaSign = (x: number, y: number) => {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.font = '20px Roboto';
    context.fillText('$', x, y);
}

const moveDollarsDown = (gravity) => {
    dollarExploder.dollars.forEach(dollar => {
        if (dollar.location.y < 1000) {
            dollar.location.y += dollar.velocity.y;
            dollar.location.x += dollar.velocity.x;
            dollar.velocity.y += gravity;
        }
    });
};

window.setInterval(() => {
    moveDollarsDown(.19);
    refreshDollars();
}, 10);


//#0092D8