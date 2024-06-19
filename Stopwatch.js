let timer;
let startTime;
let updatedTime;
let difference;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime() - (difference || 0);
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
    startPauseButton.textContent = '⏸ Pause';
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startPauseButton.textContent = '▶ Start';
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    difference = 0;
    display.textContent = '00:00:00';
    startPauseButton.textContent = '▶ Start';
    lapsContainer.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-time');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsContainer.appendChild(lapTime);
        lapCounter++;
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
