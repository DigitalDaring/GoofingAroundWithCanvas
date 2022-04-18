import {DollarBillYall} from "./dollar-bill-yall";
import {Coordinates} from "./coordinates";

export class DollarExplosion {
    dollars: DollarBillYall[];

    static generate(amount: number, widthOfCanvas: number): DollarExplosion {

        let allDollars = [];
        for(let i = 0; i < amount; i++) {
        
            const randomX = Math.floor(Math.random() * 100);
            const isPositiveX = Math.floor(Math.random() * 2) > 0;
            const randomVelocityX = (isPositiveX ? 1 : -1) * Math.floor(Math.random() * 5);
            const randomVelocityY = -1 * Math.floor(Math.random() * 20);
            
            const newCoord = {
                x: widthOfCanvas / 2 + randomX,
                y: 100
            } as Coordinates;

            const newDollarBill = {
                location: newCoord,
                scale: 1,
                opacity: 1,
                velocity: {x: randomVelocityX, y: randomVelocityY} as Coordinates
            } as DollarBillYall;

            allDollars = [...allDollars, newDollarBill];
        }

        return {
            dollars: allDollars,
        } as DollarExplosion;
    }
}

