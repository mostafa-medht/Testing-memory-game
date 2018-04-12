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
    var restart = document.getElementById('restart');
    var moves = document.getElementById("moves");
    var stars = document.getElementById("stars");
    var star = document.querySelector('.fa-star');
    var uls = document.getElementsByTagName('ul');
    var winMsg = document.createElement('div');
    var winClass = document.getElementById('winClass');
    const winInfo = document.createElement('div');
    var counter = 0 ;
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    $deck = $('.deck');
    $moves = $('.moves');
    
    cards = ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'];
    
    function init () {
    shuffle(cards);
    $deck.empty();
    // A for loop creates 16  <li> tags with the class of card for every <i> tag
    // A class of fa fa- and a name of each object from the objects=[] array
    for (let i = 0; i < cards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
    }
    
    for (let i=0; i<=2 ;i++){
     uls[0].children[i].firstChild.className = "fa fa-star";
    }

    winMsg.style.display = 'none';
    
    clickHandler();
    
    var timer = setInterval(setTime, 1000);
    window.clearInterval(timer);
    reset();
    }


    function shuffle (cards){
        let random = 0; 
        let temp = 0;
        for(let i=0;i<cards.length ;i++){
            random = Math.round(Math.random()*i) ;
            //console.log(random);
            temp = cards[i];
            cards[i] = cards[random];
            cards[random] = temp;
        }
        console.log(cards)
    }

    function count() {
        return counter +=1;
    };
    

    function reset(){
        totalSecs  = 0;
        counter = 0;
        moves.innerHTML = '0';
        winMsg.style.display='none';
    };
   
    restart.addEventListener('click', init);

    var totalSecs = 0;
    var timer = setInterval(setTime, 1000);

    function setTime (){
        totalSecs++ ; 
        secondsLabel.innerHTML = convertToStr(totalSecs%60);
        minutesLabel.innerHTML = convertToStr(parseInt(totalSecs/60));
    };

    function convertToStr (value){
        let valueStr = value + '' ;
        if (valueStr.length < 2){
            return '0' + valueStr; 
        } else {
            return valueStr;
        }
    }

    function clickHandler (e){
        $('.card').on('click',function(e){
                if (e.target.id === 'deck' ||
                e.target.className.includes('open') ||
                e.target.className.includes('match')
            ) {
                    return true;
                } 
                $(this).addClass('card show open')
                this.openCards = document.getElementsByClassName('card show open');
                if(this.openCards && this.openCards.length >= 2) {
                    checMatch(this.openCards);
                }
                //app.checMatch();
            //adds counter
            // moves++; 
            // $moves.html(moves);
            //moves.innerHTML = count();
            // runs star rating function
            rating();
        });
        
               
    }

    function checMatch (cards){
        let opCards = cards;
            if ($('.card.show.open ').length==2){
                moves.innerHTML = count();
                if (opCards&&opCards[0].children[0].className == opCards[1].children[0].className){
                    $('.card.show.open').each(function(){
                        $(this).addClass('match');
                    });
                    $('.card.show.open').each(function(){
                        $(this).removeClass('show open');
                    });    
                    checWin();
                }else {
                    $deck.find('.open').addClass('unmatch');
                    setTimeout(function(){
                        $('.card.show.open').each(function(){
                            $(this).removeClass('show open unmatch');
                        }); 
                    },400);
                }
                
        }
    }

    function checWin(){
        if($('.match').length == 2){
        // const h2 =document.createElement('h3');
        // h2.textContent = ":D Congratulation :) ,You Win ";
        // winMsg.append(h2);
        // br
        // const h4 = document.createElement('h5');
        // h4.textContent = 'You win in ' + moves.innerHTML + ' moves in ' + totalSecs + ' Sec!' + 'With only ' +star.innerHTML.length +'Stars';
        // winMsg.append(h4);
        // var currentDiv = document.getElementById("container");
        // document.body.insertBefore(winMsg, currentDiv);
        // winMsg.style.cssText = 'display: inherit;position: absolute;z-index: 2;padding-top: 300px;padding-left: 350px;font-size: 5em;text-align: center;padding-right: 150px;padding-bottom: 300px; list-style-type: none; display: flex';    
        // $('#winnerText').text(`In ${totalSecs} seconds, you did a total of ${moves.innerHTML} moves with a score of . Well done!`);
        // $('#winnerModal').model('toggle');
        $('#myText').text(`In ${totalSecs} seconds, you did a total of ${moves.innerHTML} moves with Scores ${$('.fa-star').length} . Well done!`);
        $('#infoModalLabel').html('<h4> &#9818; &#9787; &#9996; Congratulation ,You Win ! &#9996; &#9818; &#9787; <h4>');    
        $('#myModal').modal('toggle');
        }
    }

    function checLose(){
        if (moves.innerHTML >20){
            $('#myText').text(`In ${totalSecs} seconds, you did a total of ${moves.innerHTML} moves with Scores 0. Well done!`);
            $('#infoModalLabel').html('<h4> &#9785; &#9785 OOps , You Lose &#9785; &#9785; <h4>');
            $('#myModal').modal('toggle');
        }
    }
    function rating(){
        if (moves.innerHTML > 7 && moves.innerHTML <= 10){
            uls[0].children[0].firstChild.className = "fa fa-star-o";
        } else if ( moves.innerHTML > 10 && moves.innerHTML <=20) {
            uls[0].children[1].firstChild.className = "fa fa-star-o";
        }
        else  {
            checLose();
        }
    };
    
init ();
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