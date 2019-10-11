import {Grid} from './models/grid';

const grid = Grid.generate(640, 480, 20);
const canvas = document.getElementById('dotsCanvas') as HTMLCanvasElement;
const context = canvas.getContext("2d");

const refreshDots = () => {
    context.fillStyle = 'rgba(255, 255, 255, 1';
    context.fillRect(0, 0, 640, 480);
    grid.dots.forEach((dot) => {
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillRect(dot.location.x, dot.location.y, 1,1);
    });
};

const moveDotsTowardDestination = () => {
    grid.dots.forEach((dot) => {
        if (dot.location.x !== dot.destination.x) {
            const addThis = dot.location.x > dot.destination.x ? -.1 : .1;
            dot.location.x += addThis;
        }

        if(dot.location.y !== dot.destination.y) {
            const addThis = dot.location.y > dot.destination.y ? -.1 : .1;
            dot.location.y += addThis;
        }
    });
};

const randomizeDestinations = () => {
    grid.dots.forEach((dot) => {
        dot.destination.x = dot.anchor.x + Math.floor(Math.random() * 10);
        dot.destination.y = dot.anchor.y + Math.floor(Math.random() * 10);
    });
};

window.setInterval(() => {
    randomizeDestinations();
}, 1000);


(window as any).newDestinations = randomizeDestinations;

window.setInterval(() => {
    console.log('moving?');
    moveDotsTowardDestination();
    refreshDots();
}, 50);

