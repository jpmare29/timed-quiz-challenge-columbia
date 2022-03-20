const timer = document.querySelector('.timer-value');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const btn = document.getElementById('testBtn');
const btnContainer = document.getElementById('answer-buttons');
const highScoreDisplay = document.querySelector('.timer-value');
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
let highScore;
let timeLeft = 11;
let userScore = 0;
let j = 0;

function retrieveHighScore() {
    const highScoreObj = localStorage.getItem('highScore');
    highScore = highScoreObj.score;
    highScoreDisplay.textContent = highScore;
}


function countdown() {

var timeInterval = setInterval(function() {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0 || timeLeft < 0) {
        timer.textContent = 0;
        endGame();
        clearInterval(timeInterval);
    }
}, 1000);

}

function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    countdown();
    setNextQuestion();
}

function setNextQuestion() {
    if (j === questionArray.length) {
        endGame();
    }

    while(btnContainer.firstChild) {
        btnContainer.removeChild(btnContainer.firstChild);
    }

        questionText.textContent = questionArray[j].question;
    for (let i = 0; i < questionArray[j].answers.length; i++) {
        let tBtn = document.createElement('btn');
        tBtn.classList = 'testBtn'
        tBtn.textContent = questionArray[j].answers[i].text;
        tBtn.id = questionArray[j].answers[i].correct;
        btnContainer.appendChild(tBtn);
    }
    j++;
}
    
function selectQuestion(event) {
        let element = event.target;
        if (element.matches('.testBtn')) {
            if (element.id === 'true') {
                userScore++;
                console.log(userScore);
            } else {
                timeLeft -= 3;
            }
            setNextQuestion();
        }
}

function getInitials() {
    let storeScore = window.prompt('Enter your initials:');
    if (!storeScore) {
        window.alert('Please enter your initials');
        storeScore = getInitials();
    }
    return storeScore;
}

function resetGame() {
    timeLeft = 11;
    userScore = 0;
    j = 0;
}

function endGame() {
    let userInitials
    //Hide questions
    questionContainer.classList.add('hide');

    //Get initials from user to create key for local storage
    if (userScore > highScore) {
        window.alert('New High Score!')
        userInitials = getInitials();
        highScore = userScore;
        highScoreDisplay.textContent = highScore;
        localStorage.setItem('highScoreObj', JSON.stringify(userInitials), JSON.stringify(highScore));
    } else {
        window.alert('Game Over')
        userInitials = getInitials();
        localStorage.setItem(JSON.stringify(userInitials), JSON.stringify(userScore));
    }

}

startButton.addEventListener('click', startGame);
questionContainer.addEventListener('click', selectQuestion);
