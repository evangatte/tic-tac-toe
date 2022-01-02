$(document).ready(() => {
let t1 = $('#t1');
let t2 = $('#t2');
let t3 = $('#t3');
let m1 = $('#m1');
let m2 = $('#m2');
let m3 = $('#m3');
let b1 = $('#b1');
let b2 = $('#b2');
let b3 = $('#b3');
let ticTac = $('.tic-tac');
let resetButton = $('#reset-button');

//variations to win
let f1 = [t1, t2, t3];
let f2 = [m1, m2, m3];
let f3 = [b1, b2, b3];
let f4 = [t1, m1, b1];
let f5 = [t2, m2, b2];
let f6 = [t3, m3, b3];
let f7 = [t1, m2, b3];
let f8 = [t3, m2, b1];

let trackPlayersTurn = 1;
let aiChoices = [t1, t2, t3, m1, m2, m3, b1, b2, b3];
let counter = 0;



//hover effects
ticTac.css('cursor', 'pointer');


$('#ai-button').hover(() => {
    $('#ai-button').addClass('bg-dark')
    $('#robo-image').show();
}, () => {
    $('#robo-image').hide();
    $('#ai-button').removeClass('bg-dark')
})


$('#human-button').hover(() => {
    $('#human-image').show()
}, () => { $('#human-image').hide()
})



$('#human-button').click(() => {
    $('#human-button').addClass('play-human');
    $('#ai-button').removeClass('play-ai');
    $('#ai-button').removeClass('btn-primary');
    $('#start-game').prop('disabled', false)
})

$('#ai-button').click(() => {
    $('#ai-button').addClass('btn-primary');
    $('#ai-button').addClass('play-ai');
    $('#human-button').removeClass('play-human');
    $('#human-button').removeClass('btn-primary');
    $('#start-game').prop('disabled', false)
})



$('#start-game').on('click', () => {
    ticTac.text('.');
    ticTac.addClass('text-info')
     if (!(($('#ai-button').hasClass('play-ai')) || ($('#human-button').hasClass('play-human')))) {
        alert('Choose Am Oponent!')
        return;
    } else {
        $('#start-game').addClass('animated bounce');
        setTimeout(() => {
            $('#reset-modal').slideUp('fast', () => {
                $('#game-container').css('display', 'flex');
            })
        }, 1000);
        if ($('#human-button').hasClass('play-human')) {
            playHumanGame();
        } else if ($('#ai-button').hasClass('play-ai')){
            playComputerGame();
        }
    }
})












//player vs computer


 function randomSelection(){
     let val = Math.floor(Math.random() * aiChoices.length);
     if(aiChoices[val].hasClass('invalid')) {
         for (i = 0; i < aiChoices.length; i++) {
             if (!aiChoices[i].hasClass('invalid')) {
                 return aiChoices[i];
             }
         }
    } else {
        return aiChoices[val];
    }
}

function computerRound() {
    let random = randomSelection()
    random.removeClass('text-info')
    random.text('O');
    random.css('color', 'red');
    random.addClass('invalid');
    random.addClass('compPoint');
    counter++
    trackPlayersTurn = 1;
    console.log(counter)
    checkCompWins()
}



function playComputerGame() {
    resetButton.click(() => {
        $('#game-container').css('display', 'none');    
        $('#reset-modal').slideDown('slow');
         ticTac.css('color', 'white');
         //ticTac.text('&nbsp');
         ticTac.removeClass('invalid')
         ticTac.removeClass('playerPoint')
         ticTac.removeClass('compPoint')
         $('#human-button').removeClass('btn-primary');
         $('#human-button').removeClass('play-human')
         $('#ai-button').removeClass('btn-primary');
         $('#ai-button').removeClass('play-ai');
         ticTac.off('click')
         $('#game-container').children().prop('disabled', false);
         $('#winning-screen').html(' ');
         trackPlayersTurn = 1;
         counter = 0;
    })
    ticTac.on('click', (event) => {
        if ($(event.target).hasClass('invalid')) {
            return;
        } else if (trackPlayersTurn === 1) {
            $(event.target).removeClass('text-info');
            $(event.target).text('X');
            $(event.target).css('color', 'blue');
            $(event.target).addClass('invalid');
            $(event.target).addClass('playerPoint');
            counter++
            trackPlayersTurn = 2;
            checkIfPlayerwins();
            setTimeout(computerRound, 300);
        } else if (trackPlayersTurn === 2){
            setTimeout(computerRound, 300);
        }
    })

}

//functions/cb functions to check for winner (computer vs player)
function checkIfPlayerwins() {
    if(f1.every(playerCallBack) || f2.every(playerCallBack) || f3.every(playerCallBack) || f4.every(playerCallBack) || f5.every(playerCallBack) || f6.every(playerCallBack) || f7.every(playerCallBack) || f8.every(playerCallBack)) {
        $('#winning-screen').html('<h1>Humans FTW</h1>');
        $('#game-container').children().prop('disabled', true);
        ticTac.addClass('invalid');
        trackPlayersTurn = 1;
    } else if (counter === 9) {
        alert('tie game')
        resetButton.trigger('click')
    }
}



function playerCallBack(val) {
   return val.hasClass('playerPoint');
}



function checkCompWins() {
    if (f1.every(compCb) || f2.every(compCb) || f3.every(compCb) || f4.every(compCb) || f5.every(compCb) || f6.every(compCb) || f7.every(compCb) || f8.every(compCb))
    {
        $('#winning-screen').html('<h1>You let this dumb Computer Win?</h1>');
        $('#game-container').children().prop('disabled', true);
        ticTac.addClass('invalid');
        trackPlayersTurn = 1;
    } else if (counter === 9) {
        alert('tie game!')
        resetButton.trigger('click')
    }
}
function compCb(val) {
    return val.hasClass('compPoint');
}









//player vs player
function playHumanGame() {
    resetButton.click(() => {
        $('#game-container').css('display', 'none');    
        $('#reset-modal').slideDown('slow');
         ticTac.css('color', 'white');
         ticTac.text('&nbsp');
        ticTac.off('click')
        ticTac.prop('disabled', false)
        ticTac.removeClass('playerOne')
        ticTac.removeClass('playerTwo')
       $('#human-button').removeClass('btn-primary');
       $('#human-button').removeClass('play-human')
       $('#ai-button').removeClass('btn-primary');
       $('#ai-button').removeClass('play-ai');
       ticTac.removeClass('invalid');
       $('#winning-screen').html(' ');
       counter = 0;
       trackPlayersTurn = 1;
    })

    ticTac.on('click', (event) => {
        console.log(counter)
        if (counter === 9) {
            handleTieHuman()
            console.log(counter)
        }
        else if ($(event.target).prop('disabled')) {
            return;
        } else if (trackPlayersTurn === 1) {
            $(event.target).removeClass('text-info');
            $(event.target).text('X');
            $(event.target).css('color', 'blue');
            $(event.target).prop('disabled', true);
            $(event.target).addClass('playerOne');
            $(event.target).addClass('invalid');
            counter++
            trackPlayersTurn = 2;
                if (checkPlayOneWin()); {
                    return;
            }
        } else {
            $(event.target).removeClass('text-info');
            $(event.target).prop('disabled', true);
            $(event.target).text('O')
            $(event.target).css('color', 'red');
            $(event.target).addClass('playerTwo');
            $(event.target).addClass('invalid');
            counter++
            trackPlayersTurn = 1;
                if (checkPlayTwoWin()) {
                    return;
           }
        }
    })
    return;
}




//functons/cb function to check for winner (player vs player)
function checkPlayOneWin() {
    if(f1.every(cb) || f2.every(cb) || f3.every(cb) || f4.every(cb) || f5.every(cb) || f6.every(cb) || f7.every(cb) || f8.every(cb)) {
        $('#winning-screen').html('<h1>Player One Wins</h1>');
        $('#game-container').children().prop('disabled', true);
        trackPlayersTurn = 1;
    } else if (counter == 9) {
        alert('tie game')
        resetButton.trigger('click')
        
    }
}



function cb(val) {
   return val.hasClass('playerOne');
}







function checkPlayTwoWin() {
    
    if (f1.every(playTwoCb) || f2.every(playTwoCb) || f3.every(playTwoCb) || f4.every(playTwoCb) || f5.every(playTwoCb) || f6.every(playTwoCb) || f7.every(playTwoCb) || f8.every(playTwoCb)) {
        $('#winning-screen').html('<h1>Player Two Wins</h1>');
        $('#game-container').children().prop('disabled', true);
        trackPlayersTurn = 1;
    } else if (counter === 9) {
        alert('tie game')
        resetButton.trigger('click')
    }
}


function playTwoCb(val) {
    return val.hasClass('playerTwo');
}
})