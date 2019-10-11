import {Dot} from "./dot";
import {Coordinates} from "./coordinates";
import {Connector} from "./connector";

export class Grid {
    dots: Dot[];
    connectors: Connector[];

    static generate(width: number, height: number, spacing: number): Grid {

        let allDots = [];
        let allConnectors = [];

        for(let x = 0; x < width; x += spacing) {
            for (let y = 0; y < height; y += spacing) {
                const newCoord = {
                    x: x,
                    y: y
                } as Coordinates;

                const newDot = {
                    anchor: Object.assign({}, newCoord),
                    location: Object.assign({}, newCoord),
                    destination: Object.assign({}, newCoord),
                    opacity: Math.random()
                } as Dot;

                allDots = [...allDots, newDot];
            }
        }

        return {
            dots: allDots,
            connectors: allConnectors
        } as Grid;
    }
}

