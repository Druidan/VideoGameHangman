
        var letterSpace = {};

        var videoGames = ["Bioshock", "Super Mario", "Metroid", "Tetris", "Dragon's Lair", "Undertale", "Uncharted", "The Legend of Zelda: Ocarina of Time"];

        var hiddenWord; 

        var displayHiddenWord = document.getElementById("hidden-word");

        var wins = document.getElementById("wins");

        var recentGuess = document.getElementById("recent-guess");

        var badGuess = document.getElementById("wrong-guesses");

        var wrongGuesses=[];

        var goodGuess = document.getElementById("correct-guesses");

        var correctGuesses=[];

        var remainingGuesses;

        var emptySpaces;

        var filledSpaces;
    
        var displayRemainingGuesses = document.getElementById("remaining-guesses");

        var displayImg = document.getElementById("background-image")

    function selectGame(){
        //randomnly select videogame from theme array. 
        hiddenWord = videoGames[Math.floor(Math.random() * videoGames.length)]; 
        //Set remaining guesses.
        if (hiddenWord.length < 7) {
            remainingGuesses = (hiddenWord.length+(7-hiddenWord.length));
        } else {
            remainingGuesses = 4;
        }
        //display remaining guesses to player
        displayRemainingGuesses.textContent = remainingGuesses;
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
        //sets win condition
        emptySpaces = 0;
        for (var property1 in letterSpace) {
            if (letterSpace[property1].textContent = "_") {
                ++emptySpaces
            };
        }
        //Send the hidden word to a displayable paragraph in the HTML.
        displayHiddenWord.textContent = hiddenWord;
    };

//
    function checkWrong(){
        //if the guess is wrong, display the letter in the "Already Guessed" section, and reduce the number of remaining guesses.
        if (((displayHiddenWord.textContent.toLowerCase().includes(recentGuess.textContent.toLowerCase()) === false) && (badGuess.textContent.includes(recentGuess.textContent.toLowerCase()) === false))) {
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
        correctGuesses=[];
        goodGuess.textContent = correctGuesses;
    };

//Background Image Toggle Function
    function toggleImg() {
        if (window.innerWidth >= 720) {
            displayImg.removeAttribute("src");
            wideImg = document.createAttribute("src");
            wideImg.value = "images/TVwide.png";
            displayImg.setAttributeNode(wideImg);
        }
        else {
            displayImg.removeAttribute("src");
            thinImg = document.createAttribute("src");
            thinImg.value = "images/TVthin.png";
            displayImg.setAttributeNode(thinImg);
        }    
    }

// Set starting parameters on page load
    window.onload = function (event) {
        //adjust background image based on window size
        toggleImg();
        // set the Hidden Word
        selectGame();
};

//change background image whenever screen is resized.
window.onresize = function (event) {
    //adjust background image based on window size
    toggleImg();
};

//What happens every time a player hits a key?
    document.onkeyup = function (event) {
        //grab the key the user typed.
        recentGuess.textContent = event.key;
        //compared the grabbed key to the hidden word to find if their guess is correct or not using a for loop to go through each letter space.
        var i = -1
        for (var property1 in letterSpace) {
            i++;
            //if the guess is right, update the blank spaces to display the correct letters.
            if ((recentGuess.textContent.toLowerCase() === hiddenWord.charAt(i).toLowerCase()) && (recentGuess.textContent.toLowerCase() !== " ")) { 
                letterSpace[property1].textContent = hiddenWord.charAt(i);
                if (goodGuess.textContent.includes(recentGuess.textContent.toLowerCase()) === false) {
                    correctGuesses.push(recentGuess.textContent);
                    goodGuess.textContent = correctGuesses;
                }
            };  
            if ((recentGuess.textContent.toLowerCase() === hiddenWord.charAt(i).toLowerCase()) && (recentGuess.textContent.toLowerCase() === " ")) { 
                letterSpace[property1].textContent = "-";
                if (goodGuess.textContent.includes(recentGuess.textContent.toLowerCase()) === false) {
                    correctGuesses.push(recentGuess.textContent);
                    goodGuess.textContent = correctGuesses;
                }
            };  
        }; 
        checkWrong();
        //reset filled spaces, then recount how many filled spaces there are.
        filledSpaces= 0
        for (var property1 in letterSpace) {
            if (letterSpace[property1].textContent !== "_") {
                ++filledSpaces
                //If all of the word's spaces have been filled the player wins, and the game resets.
                if ((emptySpaces - filledSpaces) === 0) {
                    ++wins.textContent;
                    alert("You Win! How many more can you win? Let's keep going!");
                    resetGame();
                }
            };
        }
    };
