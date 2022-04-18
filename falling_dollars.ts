import {DollarExplosion} from "./models/dollar-explosion";

const canvas = document.getElementById('dotsCanvas') as HTMLCanvasElement;
const context = canvas.getContext("2d");
const dollarExploder = new DollarExplosion();

const refreshDollars = () => {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fillRect(0, 0, 640, 480);
    dollarExploder.dollars.forEach((dollar) => {
        context.fillStyle = `rgba(0, 0, 0, ${dollar.opacity})`;
        drawCircle(dollar.location.x, dollar.location.y, 4);
        //drawCircle(dot.location.x, dot.location.y, 4);
    });
};

const drawCircle = (x: number, y: number, radius: number) => {
    context.strokeStyle = 'rgba(0, 0, 0, 1)';
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
};

const moveDollarsDown = (speedMultiple) => {
    dollarExploder.dollars.forEach(dollar => {
        if (dollar.location.y < 1000) {
            dollar.location.y += dollar.velocity.y * speedMultiple;
        }
    });
};

window.setInterval(() => {
    moveDollarsDown(.005);
    refreshDollars();
}, 25);

