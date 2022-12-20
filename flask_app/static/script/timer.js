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

//Making some classes
//this will allow us to save some data to pass back to the database we can add as we think of things
class Countdown {
    constructor(value) {
        this.value = value
        this.setscompleted = 0
        this.currentTime
    }
}

let exerciseTime = new Countdown(eTime);
let restTime = new Countdown(rTime);
let currentTime = exerciseTime.value;


function exerciseControl() {
    switch (activity) {
        case 'exercise':
            if (is_playing) {
                playBtn.style.backgroundColor = "green"
                is_playing = false;
                clearInterval(interval)
                playBtn.innerText = 'Play'
                currentTime = countdown.innerText
            } else if (!is_playing) { 
                playBtn.style.backgroundColor = "gray"
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
        sets.innerText--;
        currentTime = restTime.value;
        clearInterval(interval)
        is_playing = false;
        activity = 'rest';
        exerciseTime.setsCompleted++;
        return exerciseControl()
    } else if (countdown.innerText <= 0 && activity === 'rest') {
        if (sets.innerText <= 0) {
            return endExercise(exerciseTime.setsCompleted, exerciseTime.value)
        }
        currentTime = exerciseTime.value;
        clearInterval(interval)
        is_playing = false;
        activity = 'exercise'
        return exerciseControl()
    }
    countdown.innerText--
}

function endExercise(a, b) {
    clearInterval(interval)
    console.log(a)
    //display some results about the exercise
}