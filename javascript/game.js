
        var letterSpace = {};

        var videoGames = ["Bioshock", "Super Mario", "Metroid", "Tetris", "Dragon's Lair", "Undertale", "Uncharted"];

        var hiddenWord; 

        var displayHiddenWord = document.getElementById("hidden-word");

        var wins = document.getElementById("wins");

        var recentGuess = document.getElementById("recent-guess");

        var badGuess = document.getElementById("wrong-guesses");

        var wrongGuesses=[];

        var goodGuess = document.getElementById("correct-guesses");

        var correctGuesses=[];

        var remainingGuesses;

        var spacesFilled;
    
        var displayRemainingGuesses = document.getElementById("remaining-guesses");

    function selectGame(){
        //randomnly select videogame from theme array. 
        hiddenWord = videoGames[Math.floor(Math.random() * videoGames.length)]; 
        //Set remaining guesses to name length plus three.
        remainingGuesses = (hiddenWord.length);
        //display remaining guesses to player
        displayRemainingGuesses.textContent = remainingGuesses;
        //sets win condition to 0
        spacesFilled = 0;
        //create letter spaces, and set them to "_"
        for (i = 1; i <= hiddenWord.length; i++) {
            var letterSpaceP = document.createElement("p");
            var underscore = document.createTextNode("_");
            letterSpaceP.appendChild(underscore);
            letterSpaceP.setAttribute("id", "letter-space-" + [i]);
            letterSpaceP.setAttribute("class", "letterSpace");
            var masterP = document.getElementById("master-p");
            masterP.appendChild(letterSpaceP);
            }
        //Populates the letterSpace object with properties. I figured out how to add object properties in a for loop by using tips from TommyBs at Stack Overflow. Source: "https://stackoverflow.com/questions/15907052/trying-to-add-multiple-properties-to-javascript-object-using-a-loop"
        for (i = 1; i <= hiddenWord.length; i++){
            letterSpace["0" + i] = document.getElementById("letter-space-" + [i]);
        }
        //Send the hidden word to a displayable paragraph in the HTML.
        displayHiddenWord.textContent = hiddenWord;
    };

//
    function checkWrong(){
        //if the guess is wrong, display the letter in the "Already Guessed" section, and reduce the number of remaining guesses.
        if (((displayHiddenWord.textContent.includes(recentGuess.textContent.toLowerCase()) === false) && (badGuess.textContent.includes(recentGuess.textContent.toLowerCase()) === false))) {
            wrongGuesses.push(recentGuess.textContent);
            badGuess.textContent = wrongGuesses;
            --remainingGuesses
            if (displayRemainingGuesses.textContent === "1") {
                alert("You Lose! Let's try again!");
                resetGame();
                };
            }
        //update the remaining guesses in the HTML viewable to the user.
        displayRemainingGuesses.textContent = remainingGuesses;
    }

//Reset function that changes all of the variables back to their starting positions and then recalls the functions nessesary to start the game.
    function resetGame() {
        //Resets win condition
        spacesFilled = 0;
        for (i = 1; i <= hiddenWord.length; i++) {
            var letterSpaceP = document.getElementById("letter-space-" + [i]);
            letterSpaceP.parentNode.removeChild(letterSpaceP);
            }
        //Populates the letterSpace object with properties. I figured out how to add object properties in a for loop by using tips from TommyBs at Stack Overflow. Source: "https://stackoverflow.com/questions/15907052/trying-to-add-multiple-properties-to-javascript-object-using-a-loop"
        for (i = 1; i <= hiddenWord.length; i++){
            delete letterSpace["0" + i];
        }
        selectGame();
        wrongGuesses=[];
        badGuess.textContent = wrongGuesses;
    };


// Set starting parameters on page load
    window.onload = function (event) {
        // set the Hidden Word
        selectGame();
};

//What happens every time a player hits a key?
    document.onkeyup = function (event) {
        //grab the key the user typed.
        recentGuess.textContent = event.key;
        //compared the grabbed key to the hidden word to find if their guess is correct or not.
        //Use a for loop to go through each letter space.
        var i = -1;
        for (var property1 in letterSpace) {
            i++;
            //if the guess is right, update the blank spaces to display the correct letters.
            if (recentGuess.textContent.toLowerCase() === hiddenWord.charAt(i).toLowerCase()) { 
                letterSpace[property1].textContent = hiddenWord.charAt(i);
                if (goodGuess.textContent.includes(recentGuess.textContent.toLowerCase()) === false) {
                    correctGuesses.push(recentGuess.textContent);
                    goodGuess.textContent = correctGuesses;
                }
                ++spacesFilled;
                if (spacesFilled === hiddenWord.length) {
                    ++wins.textContent;
                    alert("You Win! How many more can you win? Let's keep going!");
                    resetGame();
                };
            };  
        }; 
        checkWrong();
    };
