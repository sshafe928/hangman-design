document.getElementById("play-button").addEventListener("click", function() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("overlay").style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling while overlay is active

    // Simulate fade effect
    setTimeout(function() {
        document.getElementById("overlay").style.backgroundColor = "rgba(0, 0, 0, 0)";
    }, 500);

    setTimeout(function() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("hangman-container").style.display = "block";
        document.body.style.overflow = "auto"; // Restore scrolling
    }, 1000);
});



$(document).ready(function(){
    $('#play-button').click(function() {
        $('.title, #play-button').addClass('hidden');
        setTimeout(function() {
            $('.title').css('opacity', '0');
            $('#play-button').remove();
        }, 500); // Delay in milliseconds
    });
});



$(document).ready(function(){
    var words = ['banana','epiphany','lettuce','potato','headache','haircut'];

    var chosenWord = words[Math.floor(Math.random()*words.length)];
    var guessedLetters = [];
    var remainingGuesses = 6;

    // Display underscore for letters in chosen words
    for(var i = 0; i < chosenWord.length; i++){
        $('#word-container').append('<div class="hidden-letter">_</div>');
    }

    // Function to update the display of guessed letters
    function updateGuesses(){
        $('#guess-container').empty();
        $('#guess-container').append("Guessed Letters: " + guessedLetters.join(', '));
    }

    // Function to check if the guessed letter is in the chosen word
    function checkGuess(letter){
        if(chosenWord.indexOf(letter) === -1){
            remainingGuesses--;
            $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses);
        } else {
            // Reveal correctly guessed letter
            $('.hidden-letter').each(function(index){
                if(chosenWord[index] === letter){
                    $(this).text(letter);
                }
            });
        }

        updateGuesses();
        checkGameStatus();
    }

    // Function to check if game has been won or lost
    function checkGameStatus(){
        if($('.hidden-letter:contains("_")').length === 0){
            alert('congrats! you won!');
            resetGame();
        } else if (remainingGuesses === 0){
            alert('You suck the word was:' + chosenWord);
            resetGame();
        }
    }

    // Function to reset the game
    function resetGame(){
        guessedLetters = [];
        remainingGuesses = 6;
        $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses);
        $('#word-container').empty();
        chosenWord = words[Math.floor(Math.random()*words.length)];
        for(var i = 0; i < chosenWord.length; i++){
            $('#word-container').append('<div class="hidden-letter">_</div>');
        }
        updateGuesses();
    }

    // Event handler for key presses
    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase();
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter);
            checkGuess(letter);
        }
    });

    // Event handler for reset button
    $('#reset-button').click(function(){
        resetGame();
    });

    $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses);
});