# timed-quiz-challenge-columbia

This is a timed quiz application, when the user loads the page the first function to retrieve and display a highscore is called.
If the user has not played the quiz before in the browser or cleared the local storage the function will default
display a name of No One and a high score of zero.
The empty timer and the start button are also displayed when the page loads.
When the user clicks the start button the start game function is called the start button is hidden and the first question is populated.
The functionality of all of the functions that make the game run properly are commented into the js script file explaining all the logic.
If the user selects the right answer their score is increased by one and if they select the wrong answer the time is decreased by 3.
After they select an answer and the time and score are updated respectively the previous question is removed and the next question is displayed.
Once time runs out or there are no more questions in the quiz the end game function is called and the user is alerted if they have acheived a 
new high score. They are then prompted for their initials and if it is a new high score the object holding that information is updated so that it 
can be accessed when the page is refreshed or accessed again, it is also displayed in the high score container. The initials and score are then 
store in local storage as well using the initials as a key. If we wanted to provide a list of all scores we could store these two values in an array
to a single object to then be accessed programatically.
Once the user finishes dealing with the prompt the play again button is displayed which calls the resetGame function which resets the timer, 
question counter and user score. It also displays the start button and hides itself.

https://jpmare29.github.io/timed-quiz-challenge-columbia/

![2022-03-20](https://user-images.githubusercontent.com/74988217/159170751-e144fbe6-1516-451f-9e00-217f643e6c0f.png)
