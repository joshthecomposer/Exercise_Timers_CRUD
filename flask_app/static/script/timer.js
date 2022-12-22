
let id = document.querySelector('.hidden')
id = Number(id.innerText)
let activity
let sets_completed = 0;
let currentTime
let in_progress = 0

$.ajax({
    method: 'POST',
    url: "/get_activity",
    data: {'id':id},
    cache: false,
    success: function (data) {
        activity = data.activity
        sets_completed = data.sets_completed
        currentTime = data.currentTime
        in_progress = data.in_progress
        console.log(currentTime)
        return false
    }
}).done(function () {
    let timer_card = document.querySelector('.timer-card')
    timer_card.style.display = 'block'

// Getting ahold of some elements and declaring some variables
const countdown = document.getElementById('countdown');
const playBtn = document.getElementById('play');
const timerStatus = document.getElementById('timer-status');
playBtn.addEventListener('click', exerciseControl);
let is_playing = false;

// Grabbing the countdown values
let eTime = Number(document.getElementById('exerciseTime').innerText);
let rTime = Number(document.getElementById('restTime').innerText);
let sets = document.getElementById('sets');
sets.innerText -= sets_completed



//Making some classes
//this will allow us to save some data to pass back to the database we can add as we think of things
class Countdown {
    constructor(value) {
        this.value = value
    }
}

let exerciseTime = new Countdown(eTime);
let restTime = new Countdown(rTime);

if (in_progress) {
        countdown.innerText = currentTime
} else {
    switch (activity) {
        case 'exercise':
            currentTime = exerciseTime.value;
            countdown.innerText = eTime
            break;
        case 'rest':
            currentTime = restTime.value;
            countdown.innerText = rTime
            break;
        default:
            break;
        }
}

function exerciseControl() {
    switch (activity) {
        case 'exercise':
            if (is_playing) {
                playBtn.style.backgroundColor = "green"
                is_playing = false;
                clearInterval(interval)
                timerStatus.innerText = "Paused"
                playBtn.innerText = 'Play'
                currentTime = countdown.innerText
            } else if (!is_playing) {

                $.ajax({
                    method: 'POST',
                    url: "/set_activity",
                    data: {
                        'activity': 'exercise',
                        'timer_id': id,
                        'in_progress': 1
                    },
                    cache: false,
                    success: function (data) {
                        return false
                    }
                })

                playBtn.style.backgroundColor = "gray"
                timerStatus.innerText = "Exercising"
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
                playBtn.style.backgroundColor = "green"
                playBtn.innerText = 'Play'
                timerStatus.innerText = "Paused"
                currentTime = countdown.innerText
            } else if (!is_playing) {
                $.ajax({
                    method: 'POST',
                    url: "/set_activity",
                    data: {
                        'activity': 'rest',
                        'timer_id': id,
                        'in_progress': 1,
                    },
                    cache: false,
                    success: function (data) {
                        return false
                    }
                })

                is_playing = true;
                playBtn.style.backgroundColor = "gray"
                timerStatus.innerText = "Resting"
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
        sets_completed++;
        console.log(sets_completed)
        currentTime = restTime.value;
        $.ajax({
            method: 'POST',
            url: "/set_sets_completed",
            data: {
                'timer_id': id,
                'sets_completed' : sets_completed
            },
            cache: false,
            success: function (data) {
                return false
            }
        })

        sets.innerText--
        clearInterval(interval)
        is_playing = false;
        activity = 'rest';
        return exerciseControl()
    } else if (countdown.innerText <= 0 && activity === 'rest') {
        if (sets.innerText <= 0) {
            return endExercise()
        }
        currentTime = exerciseTime.value;
        clearInterval(interval)
        is_playing = false;
        activity = 'exercise'
        return exerciseControl()
    }
    countdown.innerText--
    if (countdown.innerText % 5 == 0) {
        $.ajax({
            method: 'POST',
            url: "/set_current_time",
            data: {
                'timer_id': id,
                'currentTime' : Number(countdown.innerText)
            },
            cache: false,
            success: function (data) {
                return false
            }
        })
    }
}

function endExercise(a, b) {
    clearInterval(interval)
    timerStatus.innerText = "COMPLETE"
    document.getElementById('victory').style.display = "block";
    $.ajax({
        method: 'POST',
        url: "/reset_timer",
        data: {'timer_id': id},
        cache: false,
        success: function (data) {
            return false
        }
    })
}

})

