var timer = document.querySelector('.timer');
var startButton = document.querySelector('.start-button');
var intro = document.querySelector('.intro');
var quiz = document.querySelector('.quiz');

startButton.addEventListener('click', startGame);

function countdown() {
    var timeLeft = 11;

var timeInterval = setInterval(function() {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timeInterval);
    }
}, 1000);

}

function startGame() {
    console.log('game started');
    intro.classList.add('hidden');
    quiz.classList.remove('hidden');

    timer.textContent = 'QUIZ STARTED!!!'
    countdown();
}

function setNextQuestion() {

}

function selectAnswer() {

}