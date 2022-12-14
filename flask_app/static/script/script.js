// Getting ahold of some elements and declaring some variables
const countdown = document.getElementById('countdown');
const playBtn = document.getElementById('play');
playBtn.addEventListener('click', exerciseControl);
playBtn.addEventListener('click', init)
let is_playing = false;
let activity = 'exercise'

// Grabbing the countdown values
let eTime = Number(document.getElementById('exerciseTime').innerText);
let rTime = Number(document.getElementById('restTime').innerText);
let sets = document.getElementById('sets');


//Making some classes, ksdhfkjhsdfhsdfjhsa
//this will allow us to save some data to pass back to the database we can add as we think of things
class Countdown {
    constructor(value) {
        this.value = value
        this.setscompleted = 0
    }
}

let exerciseTime = new Countdown(eTime);
let restTime = new Countdown(rTime);
let currentTime = exerciseTime.value;

function init() {
    sets.innerText--
    playBtn.removeEventListener('click', init)
}

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
        exerciseTime.setsCompleted++;
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