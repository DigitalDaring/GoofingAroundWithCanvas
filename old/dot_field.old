import {Grid} from './models/grid';
import {Connector} from "./models/connector";
import {Dot} from "./models/dot";

const grid = Grid.generate(640, 480, 20);
const canvas = document.getElementById('dotsCanvas') as HTMLCanvasElement;
const context = canvas.getContext("2d");

const refreshDots = () => {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fillRect(0, 0, 640, 480);
    grid.dots.forEach((dot) => {
        context.fillStyle = `rgba(0, 0, 0, ${dot.opacity})`;
        context.fillRect(dot.location.x, dot.location.y, 1, 1);
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

const moveDotsTowardDestination = (speedMultiple) => {
    grid.dots.forEach((dot) => {
        if (dot.location.x !== dot.destination.x) {
            const distanceAway = Math.abs(dot.location.x - dot.destination.x);
            let speed = speedMultiple * distanceAway;
            const addThis = dot.location.x > dot.destination.x ? -speed : speed;
            const newLocation = dot.location.x + addThis;
            const wouldOvershootPositive = dot.location.x > dot.destination.x && newLocation < dot.destination.x;
            const wouldOvershootNegative = dot.location.x < dot.destination.x && newLocation > dot.destination.x;
            if(wouldOvershootNegative || wouldOvershootPositive) {
                dot.location.x = dot.destination.x;
            } else {
                dot.location.x = newLocation;
            }
        }

        if(dot.location.y !== dot.destination.y) {
            const distanceAway = Math.abs(dot.location.x - dot.destination.x);
            let speed = speedMultiple * distanceAway;
            const addThis = dot.location.y > dot.destination.y ? -speed : speed;
            const newLocation = dot.location.y + addThis;
            const wouldOvershootPositive = dot.location.y > dot.destination.y && newLocation < dot.destination.y;
            const wouldOvershootNegative = dot.location.y < dot.destination.y && newLocation > dot.destination.y;
            if(wouldOvershootNegative || wouldOvershootPositive) {
                dot.location.y = dot.destination.y;
            } else {
                dot.location.y = newLocation;
            }
        }
    });
};

const createLines = () => {
    let fromIdx = Math.floor(Math.random() * grid.dots.length - 1);
    let shouldContinue = true;
    while(shouldContinue) {
        const toIdx = Math.floor(Math.random() * grid.dots.length - 1);
        buildLineFromTo(grid.dots[fromIdx], grid.dots[toIdx]);
        shouldContinue = Math.floor(Math.random() * 2) > 0;
        fromIdx = toIdx;
    }

};

const buildLineFromTo = (from: Dot, to: Dot) => {
    grid.connectors.push({
        from: from,
        to: to
    } as Connector)
};

const drawLines = () => {
    grid.connectors.forEach((connector) => {
        context.strokeStyle = 'rgba(0, 0, 0, .3)';
        context.beginPath();
        context.moveTo(connector.from.location.x, connector.from.location.y);
        context.lineTo(connector.to.location.x, connector.to.location.y);
        context.stroke();
        drawCircle(connector.to.location.x, connector.to.location.y, 4);
        drawCircle(connector.from.location.x, connector.from.location.y, 4);
    })
};

const randomizeDestinations = () => {
    grid.dots.forEach((dot) => {
        const isPositiveX = Math.floor(Math.random() * 2) > 0;
        const isPositiveY = Math.floor(Math.random() * 2) > 0;
        const addX = (isPositiveX ? 1 : -1) * Math.floor(Math.random() * 100);
        const addY = (isPositiveY ? 1 : -1) * Math.floor(Math.random() * 100);
        dot.destination.x = dot.anchor.x + addX;
        dot.destination.y = dot.anchor.y + addY;
    });
};

for(var i = 0; i < 4; i++) {
    createLines();
}

randomizeDestinations();

const disturbTheGrid = () => {
    const nextDisturbanceDelay = 1000 + Math.floor(Math.random() * 3000);
    randomizeDestinations();
    window.setTimeout(() => {
      disturbTheGrid();
    }, nextDisturbanceDelay);
};

(window as any).newDestinations = randomizeDestinations;
disturbTheGrid();

window.setInterval(() => {
    moveDotsTowardDestination(.005);
    refreshDots();
    drawLines();
}, 25);

