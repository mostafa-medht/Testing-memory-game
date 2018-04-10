/*
 * Create a list that holds all of your cards
 */
$(document).ready(function(){
    /*
     * Create a list that holds all of your cards
     */
    // Adding main Vars 
    var deck = document.querySelectorAll('.card');
    var newArray = Array.from(deck);
    var matchedCards = document.getElementsByClassName('card match');
    var openCards = document.getElementsByClassName('card show open');
    var moves = document.getElementById("moves");
    var stars = document.getElementById("stars");
    var uls = document.getElementsByTagName('ul');
    const winMsg = document.createElement('div');
    const winInfo = document.createElement('div');
    //var hourssLabel = document.getElementById("hours");
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    let totalSecs = 0
    $deck = $('.deck');

    






// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }






}); 