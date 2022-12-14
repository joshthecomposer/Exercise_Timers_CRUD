// Getting ahold of the buttons
const countdown = document.getElementById('countdown');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');

// Grabbing the countdown values
let eTimer = document.getElementById('exerciseTime');
console.log(eTimer);
eTimer = Number(eTimer.innerText);
console.log(eTimer);

//Making some classes for counter functionality
class Countdown {
    constructor(value) {
        this.value = value;
    }
}

const exerciseTime = new Countdown();

playBtn.addEventListener('click')
pauseBtn.addEventListener('click')