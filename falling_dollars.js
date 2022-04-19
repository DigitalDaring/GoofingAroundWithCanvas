let loadedImage = null;
const loadImageFromUrl = async(imgUrl) => new Promise((resolve) => {
    const img = new window.Image();
    img.addEventListener('load', () => {
       loadedImage = img; 
       resolve();
    });
    img.setAttribute('src', imgUrl);
});

class DollarExplosion {
    dollars = [];

    static generate(amount, widthOfCanvas) {

        let allDollars = [];
        for(let i = 0; i < amount; i++) {
        
            const randomX = Math.floor(Math.random() * 100);
            const isPositiveX = Math.floor(Math.random() * 2) > 0;
            const randomVelocityX = (isPositiveX ? 1 : -1) * Math.floor(Math.random() * 5);
            const randomVelocityY = -1 * Math.floor(Math.random() * 20);
            
            const newCoord = {
                x: widthOfCanvas / 2 + randomX,
                y: 100
            };

            const newDollarBill = {
                location: newCoord,
                scale: 1,
                opacity: 1,
                velocity: {x: randomVelocityX, y: randomVelocityY}
            };

            allDollars = [...allDollars, newDollarBill];
        }

        return {
            dollars: allDollars,
        };
    }
}



const canvas = document.getElementById('dotsCanvas');
const context = canvas.getContext("2d");
const dollarExploder = DollarExplosion.generate(10, 640);

const refreshDollars = () => {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.clearRect(0, 0, canvas.width, canvas.height);
    dollarExploder.dollars.forEach((dollar) => {
        context.fillStyle = `rgba(0, 0, 0, ${dollar.opacity})`;
        drawCircle(dollar.location.x, dollar.location.y, 30);
        context.drawImage(loadedImage, dollar.location.x - 25, dollar.location.y -25, 50, 50);
    });
};

const drawCircle = (x, y, radius) => {
    context.strokeStyle = 'rgba(0, 146, 216, 1)';
    context.fillStyle = 'rgba(0, 146, 216, 1)';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
};

const drawDollaSign = (x, y) => {
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.font = '20px Roboto';
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

const removeDistantDollars = () => {
    const toRemove = [];
    dollarExploder.dollars.forEach((dollar, index) => {
        if (dollar.location.y >= 999) {
            toRemove.push(index);
        }
    });

    toRemove.sort((a, b) => b-a).forEach(indexToDelete => {
        dollarExploder.dollars.splice(indexToDelete, 1);
    });
}

loadImageFromUrl('spark.png');

window.setInterval(() => {
    if (dollarExploder.dollars.length > 0 && loadedImage) {
        moveDollarsDown(.19);
        removeDistantDollars();
        refreshDollars();
    }
}, 10);


//#0092D8