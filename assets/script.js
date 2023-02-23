var timeEl = document.body.querySelector('.timer');
var highScoreEl = document.body.querySelector(
    '.highscoreboard');
var flexbox = document.body.querySelector('.flexbox');
var quizEl = document.body.querySelector('#quizBox');
var welcomePage = document.body.querySelector('#welcomeToQuiz');
var theQuiz = document.body.querySelector('#quizBox');
var addHighScores = document.body.querySelector('#addHighScores');
var multipleChoice = document.body.querySelectorAll('.mc');
var titles = document.body.querySelector('h2');
var welcomeTitle = document.body.children[1].children[0].children[0];
var welcomeInstructions = document.body.children[1].children[0].children[1];
var startButton = document.body.children[1].children[0].children[2];
var headerStyle = document.body.querySelector('header');
var grade = document.querySelector('.grade');
var questionTitle = document.body.children[1].children[1].children[0];
var myScore = document.body.children[1].children[2].children[0];
var submitMyScore = document.body.querySelector('#submit');
var myInitials = document.getElementById("initials");
var scoreList = document.getElementById('highscore-List');
var scoreboard = document.getElementById('scoreboard');

//Establish Welcome Page Text in Header
timeEl.textContent = 'Timer: 60 Seconds';
highScoreEl.textContent = 'View High Scores';

//Styling Attributes - Flexbox on header and main section. Styling for Welcome Page
headerStyle.setAttribute('style', 'display: flex; flex-wrap: wrap; justify-content: space-between; background-color: purple; color: white; font-size: 10px; padding: 20px;');
flexbox.setAttribute('style', "display: flex; flex-direction: column; justify-content: center; align-items: center;");
welcomePage.setAttribute('style', 'min-height: 400px; width: 70%; margin-top: 20px; text-align: center;');
titles.setAttribute('style', 'margin: 20px; text-align: center; padding-top: 50px;');
welcomeInstructions.setAttribute('style', 'margin: 50px; text-align: center;');

//Sets inital values for seconds remaining on time, quiz score, and the index value
var secondsLeft = 60;
var quizScore = 0;
var currentIndex = 0;

//establishes what content is displayed during WelcomePage
function showWelcome () {
addHighScores.setAttribute('style', 'display:none;');
scoreboard.setAttribute('style', 'display:none;');
welcomeTitle.textContent = 'Welcome to Coding Quiz';
welcomeInstructions.textContent = 'You will have 60 seconds to answer 4 questions about HTML, CSS, and/or JavaScript. Be careful! If you get a question wrong, time will be removed from the clock. The quiz is over when the timer reaches 0 or you answer all 4 questions.';
startButton.textContent = 'Start Quiz';
}

showWelcome ();

//local storage attempt - incorrect
var storehighScore = function () {
    theQuiz.setAttribute('style','display:none;');
    //welcomePage.setAttribute('style','display:none;');
    addHighScores.setAttribute('style', 'min-height: 400px; width: 70%; margin-top: 20px; text-align: center;');
    myScore.textContent = "My Score: " + quizScore;

    submitMyScore.addEventListener('click', function () {
        console.log(myInitials);
        var playerInitials = localStorage.setItem("playerInitials");
        myInitials.textContent = playerInitials;
        viewHighScores();

    });

}
//local storage attempt - not working as intended
var viewHighScores = function () {
    theQuiz.setAttribute('style','display:none;');
    welcomePage.setAttribute('style','display:none;');
    addHighScores.setAttribute('style','display:none;');
    scoreboard.getAttribute('style', 'min-height: 400px; width: 70%; margin-top: 20px; text-align: center;');
    localStorage.getItem("playerInitials", playerInitials);

    var li = document.createElement('li');
    li.textContent = myInitials.textContent + ' - ' + quizScore

    scoreList.appendChild(li);
}

//Sets Timer to Start and Stop Once Start Quiz Button is clicked
function setTimer () {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft + " Seconds";

    if (secondsLeft <= 0 || currentIndex > 3) {
        clearInterval(timerInterval);
        timeEl.textContent = 'Timer: 0 Seconds';
        storehighScore();
    }

    }, 1000);
}

//Array with Quiz Questions, Answer Choices, and Correct Answers
var quizQuestions = {
    Questions: ['What declaration MUST be included as the first item in an HTML document before the tag and is used to provide instructions to the web browser?','Every HTML page must include a reference to the external file sheet file inside the ____ element.', 'What is the name of CSS design that calls for fluid and adaptable elements based on the device resolution or size?', 'What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?'],
    AnswerChoices: [['1. <caption>', '2. <embed>', '3. <code>', '4. <!DOCTYPE>'], ['1. <div>', '2. Link', '3. Body', '4. Footer'], ['1. Evolution', '2. Shifting', '3. Responsive', '4. Cascading'], ['1. While Loop', '2. For Loop', '3. Else Loop', '4. Conditional Loop']],
    CorrectChoice: ['4. <!DOCTYPE>', '2. Link', '3. Responsive', '1. While Loop'],
}

//Establishes loop to go through quiz questions
var showQuestion = function () {
    questionTitle.textContent = quizQuestions.Questions[currentIndex];
    for (var i=0; i < quizQuestions.AnswerChoices[currentIndex].length; i++) {
        multipleChoice[i].textContent = quizQuestions.AnswerChoices[currentIndex][i];
        multipleChoice[i].setAttribute('style', 'margin: 20px; padding: 10px; font-weight: bold;');
    }
    multipleChoice[0].addEventListener('click', determineAnswer);
    multipleChoice[1].addEventListener('click', determineAnswer);
    multipleChoice[2].addEventListener('click', determineAnswer);
    multipleChoice[3].addEventListener('click', determineAnswer);
};

//function that determines if answer choice clicked is correct and adjusts score & timer as needed before moving to the next question
//ends the quiz if all questions answered before the timer hits 0
var determineAnswer = function (event) {
    var text = event.target.textContent
    console.log(text);
    if (text.match(quizQuestions.CorrectChoice[currentIndex]) ) {
        currentIndex = currentIndex + 1;
        grade.textContent = 'Correct!';
        quizScore = quizScore + 10;
        console.log('Current Score: ' + quizScore);
   } else {
        currentIndex = currentIndex + 1;
        grade.textContent = 'Wrong!';
        secondsLeft = secondsLeft - 5;
        quizScore = quizScore - 5;
        console.log('Current Score: ' + quizScore);}
    if (currentIndex < 4) {
        showQuestion();
    } else {
        timeEl.textContent = 'Timer: 0 Seconds';
        storehighScore();
    }}

//function that starts quiz once the start button has been clicked
var startQuiz = function () {
    setTimer();
    welcomePage.setAttribute('style','display:none;');
    theQuiz.setAttribute('style', 'min-height: 400px; width: 70%; margin-top: 20px; text-align: center;');

    showQuestion();
}

//Event Listener that calls the startQuiz function
startButton.addEventListener('click', startQuiz);