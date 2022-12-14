// Getting ahold of some elements and declaring some variables
const countdown = document.getElementById('countdown');
const playBtn = document.getElementById('play');
playBtn.addEventListener('click', exerciseControl);
let is_playing = false;
let activity = 'exercise'

// Grabbing the countdown values
let eTime = Number(document.getElementById('exerciseTime').innerText);
let rTime = Number(document.getElementById('restTime').innerText);
let sets = document.getElementById('sets');


//Making some classes for counter functionality
class Countdown {
    constructor(value) {
        this.value = value;
        this.minimum = 0
    }
}

let exerciseTime = new Countdown(eTime);
let restTime = new Countdown(rTime);
let currentTime = exerciseTime.value;

// const exerciseTime = new Countdown(eTime);

function exerciseControl() {
    switch (activity) {
        case 'exercise':
            if (is_playing) {
                is_playing = false;
                clearInterval(interval)
                playBtn.innerText = 'Play'
                currentTime = countdown.innerText
            } else if (!is_playing) { 
                is_playing = true;
                countdown.innerText = currentTime
                playBtn.innerText = 'Pause'
                interval = setInterval(counter, 1000)
            }
            break;
        case 'rest':
            if (is_playing) {
                is_playing = false;
                clearInterval(interval)
                playBtn.innerText = 'Play'
                currentTime = countdown.innerText
            } else if (!is_playing) { 
                is_playing = true;
                countdown.innerText = currentTime
                playBtn.innerText = 'Pause'
                interval = setInterval(counter, 1000)
            }
            break;
        default:
            break;
    }
}

function counter() {
    if (countdown.innerText <= 0 && activity === 'exercise') {
        currentTime = restTime.value;
        clearInterval(interval)
        is_playing = false;
        activity = 'rest';
        sets.innerText--;
        return exerciseControl()
    } else if (countdown.innerText <= 0 && activity === 'rest') { 
        currentTime = exerciseTime.value;
        clearInterval(interval)
        is_playing = false;
        activity = 'exercise'
        return exerciseControl()
    }
    countdown.innerText--;
}