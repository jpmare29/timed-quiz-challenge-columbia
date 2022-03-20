// retrieved html elements and declared global variables

const timer = document.querySelector('.timer-value');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question');
const btn = document.getElementById('testBtn');
const btnContainer = document.getElementById('answer-buttons');
const highScoreName = document.querySelector('.hs-name')
const highScoreDisplay = document.querySelector('.hs-value');
const playAgainButton = document.getElementById('play-again-btn');
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
let timeLeft = 30;
let userScore = 0;
let j = 0;

function retrieveHighScore() {
    // check localStorage for object that will be set once one play through has happened
    // set it equal to a variable that will be manipulated
    const highScoreObj = JSON.parse(localStorage.getItem('highScoreObj'));
    // If there is no highScoreObj because the game hasn't been played in the browser
    // the highscore will be initialized to No One 0 and displayed when the page loads
    // since the function will be called first
    if (!highScoreObj) {
        highScore = 0;
        highScoreDisplay.textContent = highScore;
        highScoreName.textContent = 'No One'
    } else {
        highScore = highScoreObj[1];
        highScoreDisplay.textContent = highScore;
        highScoreName.textContent = highScoreObj[0];
    }

}
// Timer Engine that will call the endGame function when there is no time left
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
// function that will be called when the start button is pressed.
// it hides the start button, shows the question container,
// begins the countdown and calls the setNextQuestion function to set the first question.
function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    countdown();
    setNextQuestion();
}
// This function will be called when the game starts and after the user selects an answer
// as long as there is time remaining and questions in the array holding all of the questions.
function setNextQuestion() {
    if (j === questionArray.length) {
        timeLeft = 0;
    }
// clears previous answer buttons
    while(btnContainer.firstChild) {
        btnContainer.removeChild(btnContainer.firstChild);
    }
// fills question text and populates container with new answer buttons
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
// function that is called when user click answer buttons and only answer buttons
// if there are questions left in the array it will call the setNextQuestion function
// else it will function as normal on the last question and empty the timer so that
// the endGame function can be called without doing so twice
function selectQuestion(event) {
        let element = event.target;
        if (timeLeft > 0 && j < questionArray.length) {
        if (element.matches('.testBtn')) {
            if (element.id === 'true') {
                userScore++;
            } else {
                timeLeft -= 3;
                timer.textContent = timeLeft;
            }
            setNextQuestion();
        }
    } else if (timeLeft > 0 && j <= questionArray.length) {
        if (element.matches('.testBtn')) {
            if (element.id === 'true') {
                userScore++;
            } else {
                timeLeft -= 3;
            }
        }
        if (j === questionArray.length) {
            timeLeft = 0;
            questionContainer.classList.add('hide');
        }
    }
}
// will prompt the user to enter initials that will be returned to be used in a later function
// this function will accept numbers or special characters if the user wants
// but will not allow an empty response.
function getInitials() {
    let storeScore = window.prompt('Enter your initials:');
    if (!storeScore) {
        window.alert('Please enter your initials');
        storeScore = getInitials();
    }
    return storeScore;
}
// function to initialize the timer, score, and question counter. It will also hide the 
// play again button that shows up after the last question and displays the start button.
function resetGame() {
    timeLeft = 30;
    userScore = 0;
    j = 0;
    playAgainButton.classList.add('hide');
    startButton.classList.remove('hide');
}
// function to hide the last question, get initials from user, put them in local storage
// and update the highScoreObj and the high score display on the page.
// Displays the playAgain button which allows the user to restart the game.
function endGame() {
    let userInitials;
    questionContainer.classList.add('hide');

    if (userScore > highScore) {
        window.alert('New High Score!')
        userInitials = getInitials();
        highScore = userScore;
        highScoreDisplay.textContent = highScore;
        highScoreName.textContent = userInitials;
        localStorage.setItem('highScoreObj', JSON.stringify([userInitials, highScore]));
        localStorage.setItem(JSON.stringify(userInitials), JSON.stringify(userScore));
    } else {
        // it would be possible to create an object like the above highScoreObj to store
        // all of the other scores. This could then be accesed to generate html elements
        // containing all of the user scores by looping through the regularScoreObj but the 
        // acceptance criteria did not state this as a necessary feature. Instead the regular scores
        // are stored as Initials alongside Scores. The High Scores are stored this way too so they are
        // not lost when a new high score is acheived.
        window.alert('Game Over')
        userInitials = getInitials();
        localStorage.setItem(JSON.stringify(userInitials), JSON.stringify(userScore));
    }

    playAgainButton.classList.remove('hide');
}
// function call and Event listeners for button clicks
retrieveHighScore();
startButton.addEventListener('click', startGame);
questionContainer.addEventListener('click', selectQuestion);
playAgainButton.addEventListener('click', resetGame);