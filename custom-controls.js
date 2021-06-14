const video = document.querySelector("video");
const controls = document.querySelector(".controls");

const playButton = document.querySelector(".play");
const stopButton = document.querySelector(".stop");
const rwdButton = document.querySelector(".rwd");
const fwdButton = document.querySelector(".fwd");

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerSeek = document.querySelector("#seek");
const timerBar = document.querySelector('.timer div');

const volumeSlider = document.querySelector("#volume");

let intervalFwd, intervalRwd;


video.removeAttribute("controls");
controls.style.visibility = "visible";

playButton.addEventListener("click", playPauseMedia);
stopButton.addEventListener("click", stopMedia);
video.addEventListener("ended", stopMedia);
rwdButton.addEventListener('click', mediaBackward);
fwdButton.addEventListener('click', mediaForward);
video.addEventListener('timeupdate', setTime);
timerSeek.addEventListener("click", seek);
volumeSlider.addEventListener("input", volume);


function playPauseMedia() {
    rwdButton.classList.remove("active");
    fwdButton.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    if (video.paused) {
        playButton.setAttribute("data-icon", "u");
        video.play();
    } else {
        playButton.setAttribute("data-icon", "P");
        video.pause();
    }
}

function stopMedia() {
    video.pause();
    video.currentTime = 0;
    playButton.setAttribute("data-icon", "P");
    rwdButton.classList.remove("active");
    fwdButton.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}

function mediaBackward() {
    clearInterval(intervalFwd);
    fwdButton.classList.remove("active");

    if (rwdButton.classList.contains("active")) {
        rwdButton.classList.remove("active");
        clearInterval(intervalRwd);
        video.play();
    } else {
        rwdButton.classList.add("active");
        video.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward() {
    clearInterval(intervalRwd);
    rwdButton.classList.remove("active");

    if (fwdButton.classList.contains("active")) {
        fwdButton.classList.remove("active");
        clearInterval(intervalFwd);
        video.play();
    } else {
        fwdButton.classList.add("active");
        video.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

function windBackward() {
    if (video.currentTime <= 3) {
        rwdButton.classList.remove("active");
        clearInterval(intervalRwd);
        stopMedia();
    } else {
        video.currentTime -= 3;
    }
}

function windForward() {
    if (video.currentTime >= video.duration - 3) {
        fwdButton.classList.remove("active");
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        video.currentTime += 3;
    }
}

function seek(e) {
    video.currentTime = e.offsetX * video.duration / timerWrapper.clientWidth;
}

function setTime() {
    let minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime - minutes * 60);
    let minutesValue;
    let secondsValue;

    if (minutes < 10) {
        minutesValue = "0" + minutes
    } else {
        minutesValue = minutes;
    }

    if (seconds < 10) {
        secondsValue = "0" + seconds;
    } else {
        secondsValue = seconds;
    }

    let videoTime = minutesValue + ":" + secondsValue;
    timer.textContent = videoTime;

    let barLength = timerWrapper.clientWidth * (video.currentTime / video.duration);
    timerBar.style.width = barLength + "px";
}

function volume() {
    video.volume = volumeSlider.value / 10;
    return volumeSlider.value
}