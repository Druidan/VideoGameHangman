# Video Game Hangman
Challenge yourself to guess the names of popular (and niche) video games of the past and present!

## Overview and Goals
Video Game Hangman is a fun video-game twist on the classic game hangman, a breezy way to pass the time, and a display of my knowledge and use of Javascript fundamentals.

## Deployment 
_This app is slated for refactoring - see future features_
The game is deployed at the following page via Github Pages - [Video Game Hangman](https://druidan.github.io/VideoGameHangman/).

## MVP
* The basic game mechanics have to be fully functional and implemented:
    * The user must be presented with a number of chances to guess letters, and blank spaces representing the letters of the hidden video game title.
    * The user must be able to type letter keys in order to make guesses at the letters of the hidden title.
    * The user must be able to see their progress, both through successfully guessed words that will appear on the screen in their correct places, and through their remaining chances counting down as they make incorrect guesses.
    * The user must be notified when they win or loose the game.
* The app must use Javascript fundamentals, such as itterating over arrays, in order to make the game functional.
* The app must have clear and appropriate CSS.

## Dependencies
_Dependencies reflect the current state of the app, and not future features_
[Bootstrap](https://getbootstrap.com/)

## Active Bugs and Issues
_There are currently no bugs that I am aware of._

## Future Features / Icebox
* Add Gifs of the project in action to this very README.
* I plan on a full revision of the code with the following goals:
    * Maintain the use of vanilla JS.
    * Replace Bootstrap with Grid, and overhaul the design and responsiveness.
    * Modularize the code, seperating it up into discrete files that can be imported into a main file.
    * Bring in later improvements I made to my code, such as the class version of the sound object.
    * Make the code more efficient in terms of space and steps required to complete tasks.
    * Add specific and clear comments to the code.
    * Look into APIs that may have a better listing of video game titles to reduce the need to write all of the game titles myself, otherwise use a database like MongoDB to hold the videogame titles.
    * Potentially add login functionality to store user data, such as high scores.