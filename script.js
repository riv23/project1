var cards = [];
var playerCard = [];
var dealerCard = [];
var cardCount = 0;

var endplay = false;

var suits = ["spades", "hearts", "clubs", "diams"];
var numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var message = document.getElementById("message");
var output = document.getElementById("output");
var dealerHolder = document.getElementById("dealerHolder");
var playerHolder = document.getElementById("playerHolder");
var pValue = document.getElementById("pValue");
var dValue = document.getElementById("dValue");





for (s in suits) {
    var suit = suits[s][0].toUpperCase();
    var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
    for (n in numb) {
    var cardValue = (n > 9) ? 10 : parseInt(n) + 1
    var card = {
    suit: suit,
    icon: suits[s],
    bgcolor: bgcolor,
    cardnum: numb[n],
    cardvalue: cardValue
    }
    cards.push(card);
    }
}

function Start() {
    shuffleDeck(cards);
    dealNew();
    document.getElementById('start').style.display = 'none';
}

function dealNew() {
    playerCard = [];
    dealerCard = [];
    dealerHolder.innerHTML = "";
    playerHolder.innerHTML = "";
    document.getElementById('myactions').style.display = 'block';
    message.innerHTML = "Get up to 21 and beat the dealer to win.<br>";
    deal();
}

function deal(){
    console.log(cards);
    // card count reshuffle
    for (x = 0; x < 2; x++) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x == 0) {
        dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
    }
    cardCount++
    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, x);
    cardCount++
    }

    pValue.innerHTML = checktotal(playerCard);
    console.log(dealerCard);
    console.log(playerCard);
}

function cardOutput(n, x) {
    var hpos = (x > 0) ? x * 60 + 100 : 100;
    return '<div class="icard ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +'<br></div> </div>';
}

function cardAction(a){
    console.log(a);
    switch (a){
    case 'hit':
    playucard(); // add new card to players hand
    break;
    case 'hold':
    playend();
    break;
              console.log('done');
              playend();
          }
        }




function playucard(){
    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, (playerCard.length -1));
    cardCount++;
    var rValu = checktotal(playerCard);
    pValue.innerHTML = rValu;
    if(rValu>21){
        message.innerHTML = "busted!";
        playend();
    }
}

function playend() {
    endplay = true;
    document.getElementById('cover').style.display = 'none';
    document.getElementById('myactions').style.display = 'none';
    document.getElementById('btndeal').style.display = 'block';
    message.innerHTML = "Game Over";
    var dealervalue =  checktotal(dealerCard);
    dValue.innerHTML = dealervalue;

    //if dealer never get 17 must draw somemore
    while(dealervalue<17){
        dealerCard.push(cards[cardCount]);
        dealerHolder.innerHTML += cardOutput(cardCount, (dealerCard.length -1));
        cardCount++;
        dealervalue =  checktotal(dealerCard);
        dValue.innerHTML = dealervalue;
    }

    //winner???
    var playervalue =  checktotal(playerCard);
    if(playervalue === 21 && playerCard.length === 2) {
        message.innerHTML = "Player Blackjack";
    }

    if((playervalue < 22 && dealervalue < playervalue) || (dealervalue > 21 && playervalue < 22 )) {
        message.innerHTML += '<span style="color:green;">You WIN! </span>';
    }

    else if (playervalue > 21) {
        message.innerHTML += '<span style="color:red;">Dealer Wins! </span>';
    }

    else if (playervalue == dealervalue) {
        message.innerHTML += '<span style="color:blue;">PUSH</span>';
    }
    else {
        message.innerHTML += '<span style="color:red;">Dealer Wins! </span>';
    }
    pValue.innerHTML < dealervalue;
}

function checktotal(arr) {
    var rValue = 0;
    var aceAdjust = false;
    for(var i in arr ) {
        if(arr[i].cardnum =='A' && !aceAdjust) {
            aceAdjust=true;
            rValue=rValue+10;
        }
        rValue=rValue+arr[i].cardvalue;
    }

    if(aceAdjust && rValue >21  ) {
        rValue=rValue-10;
    }
    return rValue;
}

function shuffleDeck(array) {
    for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    }
    return array;
}

function outputCard() {
    output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
}












// var cards = [] ;
// var playerCard = [];
// var dealerCard = [];
// var suits = ["spades", "hearts", "clubs", "diams"];
// var number = ["A", "2", '3', "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// var output = document.getElementById("output");
// var dealerHolder = document.getElementById("dealerHolder")
// var playerHolder = document.getElementById("playerHolder")
// var cardCount = 0;
// var endplay = false;
// var pValue = document.getElementById("pValue")
// var dValue = document.getElementById("dValue")

// for(s in suits) {
//     var suit = suits[s][0].toUpperCase();
//     var bgcolor =(suit == "S" || suit == "C")?"black":"red";
//     for(n in number) {
//         var cardValue =(n>9) ? 10 : parseInt(n)+1
//         var card = {
//             suit:suit,
//             icon:suits[s],
//             bgcolor:bgcolor,
//             cardnumber:number[n],
//             cardvalue:cardValue
//         }
//         cards.push(card)
//     }
// }


// function Start(){
//     shuffleDeck(cards);
//     dealNew();
// }

// function dealNew() {
//     playerCard = []
//     dealerCard = []
//     dealerHolder.innerHTML = "";
//     playerHolder.innerHTML = "";
//     for (x=0; x<2; x++) {
//         dealerCard.push(cards[cardCount])
//         dealerHolder.innerHTML += cardOutput(cardCount);
//         cardCount++
//         playerCard.push(cards[cardCount])
//         playerHolder.innerHTML += cardOutput(cardCount);
//         cardCount++
//     }
//     console.log(dealerCard);
//     console.log(playerCard);
// }

// function deal() {
//     console.log(cards)
//     //card count reshuffle
//     for(x=0;x<2;x++){
//         dealerCard.push(cards[cardcount])
//         dealerHolder.innerHTML += cardOutput(cardCount, x);
//         if (x == 0) {
//             dealerHolder.innerHTML += '<div id="cover"style="left:100px;"></div>';
//         }
//         cardCount++
//         playerCard.push(cards[cardCount])
//         playerHolder.innerHTML += cardOutput(cardCount,x)
//         cardCount++
//         }
//         pValue.innerHTML = checktotal(playerCard)
//         console.log(dealerCard)
//         console.log(playerCard)
// }



// function cardOutput(n,x) {
//     var hpos =(x>0) ? x * 60 + 100 : 100;
//     return '<div class="cardBox ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">' + cards[n].cardnumber + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnumber +'<br></br></div>';
// }

// function checktotal(arr){
//     var rValue = 0;
//     var aceAdjust = false;
//     for(var i in arr ){


//         if(arr[i].cardnum =='A' && !aceAdjust){
//             debugger;
//             aceAdjust=true;
//             rValue=rValue+10;
//         }
//         rValue=rValue+arr[i].cardvalue;
//     }

//     if(aceAdjust && rValue >21  ){
//     rValue=rValue-10;
//     }
//     return rValue;
// }



// function cardAction(a){
//     console.log(a);
//     switch (a){
//     case 'hit':
//     playucard(); // add new card to players hand
//     break;
//     case 'hold':
//     playend(); // playout and calculate
//     break;
//     default:
//     console.log('done');
//     playend(); // playout and calculate
//           }
//         }


// function playucard(){
//           playerCard.push(cards[cardCount]);
//           playerHolder.innerHTML += cardOutput(cardCount, (playerCard.length -1));
//           cardCount++;
//           var rValu = checktotal(playerCard);
//           pValue.innerHTML = rValu;
//           if(rValu>21){
//             message.innerHTML = "busted!";
//             playend();
//           }
//         }


// function playend(){
//           endplay = true;
//           document.getElementById('cover').style.display = 'none';
//           document.getElementById('myactions').style.display = 'none';
//           document.getElementById('btndeal').style.display = 'block';
//           message.innerHTML = "Game Over";
//           var dealervalue =  checktotal(dealerCard);
//           dValue.innerHTML = dealervalue;

//           while(dealervalue<17){
//             dealerCard.push(cards[cardCount]);
//             dealerHolder.innerHTML += cardOutput(cardCount, (dealerCard.length -1));
//             cardCount++;
//             dealervalue =  checktotal(dealerCard);
//             dValue.innerHTML = dealervalue;
//           }

//           //WHo won???
//           var playervalue =  checktotal(playerCard);
//           if(playervalue == 21 && playerCard.length == 2){
//             message.innerHTML = "Player Blackjack";
//           }

//           if((playervalue < 22 && dealervalue < playervalue) || (dealervalue > 21 && playervalue < 22 )){
//             message.innerHTML += '<span style="color:green;">You WIN!</span>';
//           }
//           else if (playervalue > 21){
//             message.innerHTML += '<span style="color:red;">Dealer Wins!</span>';
//           }
//           else if (playervalue == dealervalue) {
//             message.innerHTML += '<span style="color:blue;">PUSH</span>';
//           }
//           else {
//             message.innerHTML += '<span style="color:red;">Dealer Wins!</span>';
//           }

//           pValue.innerHTML = dealervalue;
//         }



// function shuffleDeck(array){
//     for(var i = array.length -1;i>0; i--) {
//         var j = Math.floor(Math.random() * (i+1))
//         var temp = array[i]
//         array[i] = array[j]
//         array[j] = temp;
//     }
//     return array;
// }

// function outputCard() {
//     output.innerHTML += "<span style='color:" + cards[cardCount].bgcolor + "'>&" + cards[cardCount].icon + ";" + cards[cardCount].cardnumber  + "</span>  "
// }