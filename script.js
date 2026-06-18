let hours = 0;
let minutes = 0;
let seconds = 0;

let timerRunning = false;
let myInterval = null;

let lapCounter = 1;
let lapsArray = [];

const displayElement = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const clearBtn = document.getElementById('clearBtn');
const lapListUl = document.getElementById('lapListUl');

function updateDisplay() {
    let hoursStr = hours.toString().padStart(2, '0');
    let minutesStr = minutes.toString().padStart(2, '0');
    let secondsStr = seconds.toString().padStart(2, '0');

    displayElement.textContent = hoursStr + ':' + minutesStr + ':' + secondsStr;
}

function increaseTime() {
    seconds = seconds + 1;

    if (seconds >= 60) {
        seconds = 0;
        minutes = minutes + 1;
    }

    if (minutes >= 60) {
        minutes = 0;
        hours = hours + 1;
    }

    updateDisplay();
}

function startStopwatch() {
    if (timerRunning === true) {
        return;
    }

    myInterval = setInterval(increaseTime, 1000);
    timerRunning = true;

    lapBtn.disabled = false;
}

function pauseStopwatch() {
    if (timerRunning === false) {
        return;
    }

    clearInterval(myInterval);
    timerRunning = false;

    lapBtn.disabled = true;
}

function resetStopwatch() {
    if (timerRunning === true) {
        clearInterval(myInterval);
        timerRunning = false;
    }

    hours = 0;
    minutes = 0;
    seconds = 0;

    updateDisplay();

    lapBtn.disabled = true;
}

function recordLap() {
    let hoursStr = hours.toString().padStart(2, '0');
    let minutesStr = minutes.toString().padStart(2, '0');
    let secondsStr = seconds.toString().padStart(2, '0');

    let currentTime = hoursStr + ':' + minutesStr + ':' + secondsStr;

    lapsArray.push({
        number: lapCounter,
        time: currentTime
    });

    lapCounter = lapCounter + 1;

    showLapsOnScreen();
}

function showLapsOnScreen() {
    lapListUl.innerHTML = '';

    if (lapsArray.length === 0) {
        lapListUl.innerHTML = '<li class="empty-message">No laps yet.</li>';
        return;
    }

    for (let i = 0; i < lapsArray.length; i++) {
        let lap = lapsArray[i];

        let li = document.createElement('li');

        li.innerHTML = '<span>Lap #' + lap.number + '</span> <span>' + lap.time + '</span>';

        lapListUl.appendChild(li);
    }
}

function clearAllLaps() {
    lapsArray = [];
    lapCounter = 1;
    showLapsOnScreen();
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
clearBtn.addEventListener('click', clearAllLaps);

updateDisplay();