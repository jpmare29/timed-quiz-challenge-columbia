const timer = document.querySelector('.timer-value');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const questionArray = [{
    question: "Which is not a keyword to declare a variable?",
    answers: [
        {text: 'let', correct: false},
        {text: 'be', correct: true},
        {text: 'var', correct: false},
        {text: 'const', correct: false},
    ]
},
{
    question: "Inside of which HTML element do we put the JavaScript",
    answers: [
        {text: '<js>', correct: false},
        {text: '<javascript>', correct: false},
        {text: '<script>', correct: true},
        {text: '<scripting>', correct: false},
    ]
},
{
    question: "How do you make a single line comment?",
    answers: [
        {text: '\\\\', correct: false},
        {text: 'comment:', correct: false},
        {text: '?', correct: false},
        {text: '//', correct: true},
    ]
},
{
    question: "Which object has mathematical operations?",
    answers: [
        {text: 'Math', correct: true},
        {text: 'Calc', correct: false},
        {text: 'Magic', correct: false},
        {text: 'Pass', correct: false},
    ]
},
{
    question: "Which is not a way of making a function?",
    answers: [
        {text: 'exclamation', correct: true},
        {text: 'arrow', correct: false},
        {text: 'expression', correct: false},
        {text: 'declaration', correct: false},
    ]
},
{
    question: "How do you find the number with the highest value of x and y?",
    answers: [
        {text: 'Math.high(x,y)', correct: false},
        {text: 'Math.ceil(x,y)', correct: false},
        {text: 'Math.max(x,y)', correct: true},
        {text: 'Math.prayer(x,y)', correct: false},
    ]
}]
let timeLeft = 11;
let userScore = 0;

startButton.addEventListener('click', startGame);

function countdown() {

var timeInterval = setInterval(function() {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timeInterval);
        endGame();
    }
}, 1000);

}

function startGame() {
    console.log('game started');
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    // nextButton.classList.remove('hide');
    countdown();
    setNextQuestion();
}

function setNextQuestion() {

}

questionContainer.addEventListener('click', function(event) {
    let element = event.target;
    if (element.matches('.btn')) {
        if (element.dataset.correct === 'true') {
            userScore++;
            console.log(userScore);
        } else {
            timeLeft -= 3;
        }
        setNextQuestion();
    }
})

function endGame() {

    //Hide questions
    questionContainer.classList.add('hide');

    //Get initials from user to create key for local storage
    const getInitials = function() {
        let highRoller = window.prompt('Enter your initials:');
        if (!highRoller) {
            window.alert('Please enter your initials');
            getInitials();
        }
    }
    //prompt user with their score and ask for initials
    //store info from prompt to local storage
    //update highscore banner if new high score
    timeLeft = 11;
    userScore = 0;
}