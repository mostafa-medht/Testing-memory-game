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
    var uls = document.getElementsByTagName('ul');
    const winMsg = document.createElement('div');
    const winInfo = document.createElement('div');
    var counter = 0 ;
    //var moves = 0;
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

    // moves = 0;
    // $moves.text('0');
    
    clickHandler();
    
    var timer = setInterval(setTime, 1000);
    window.clearInterval(timer);
    reset();
    }

    init ();

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
        //count();
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
        if($('.match').length === 16){
            winMsg.textContent = "Congratulations! :)";
            winMsg.textContent = 'You win in ' + moves.innerHTML + ' moves in ' + totalSeconds + ' sec!';
        }
    }

    function checLose(){
        if (moves.innerHTML > 45){
            $('.container').html('<h1> U Lose :(</h1>')
        }
    }
    function rating(){
        if (moves.innerHTML > 10 && moves.innerHTML <= 20){
            uls[0].children[0].firstChild.className = "fa fa-star-o";
        } else if ( moves.innerHTML > 20 && moves.innerHTML <=45) {
            uls[0].children[1].firstChild.className = "fa fa-star-o";
        }
        else  {
            checLose();
        }
    };
    

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