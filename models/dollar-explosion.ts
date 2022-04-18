import {DollarBillYall} from "./dollar-bill-yall";
import {Coordinates} from "./coordinates";

export class DollarExplosion {
    dollars: DollarBillYall[];

    static generate(amount: number): DollarExplosion {

        let allDollars = [];
        for(let i = 0; i < amount; i++) {
        
            const randomX = Math.floor(Math.random() * 100);

            const newCoord = {
                x: randomX,
                y: 0
            } as Coordinates;

            const newDollarBill = {
                location: newCoord,
                scale: 1,
                opacity: 1,
                velocity: {x: 1, y: 1} as Coordinates
            } as DollarBillYall;

            allDollars = [...allDollars, newDollarBill];
        }

        return {
            dollars: allDollars,
        } as DollarExplosion;
    }
}

