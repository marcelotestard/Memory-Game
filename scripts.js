

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var audio = document.getElementById("audio");
var audio2 = document.getElementById("audio2");

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  

  audio.play();

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
   
    return;
  }


  // second click
  secondCard = this;

  checkForMatch();
  
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
 
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));








/*CRONOMETRO*/
window.onload = function () {
  let seconds = 00;
  let tens = 00;
  let appendTens = document.getElementById("tens");
  let appendSeconds = document.getElementById("seconds");
  let buttonStart = document.getElementById("button-start");
  let buttonStop = document.getElementById("button-stop");
  let buttonReset = document.getElementById("button-reset");
  let Interval;

  // Start Button -> stopwatch begins
  buttonStart.onclick = function () {
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
     
      
      audio.play();
  };
  


  // Stop Button -> stopwatch stops
  buttonStop.onclick = function () {
      clearInterval(Interval);
     

      audio.pause();
  };
  // Reset Button -> stopwatch resets
  buttonReset.onclick = function () {
      clearInterval(Interval);
      tens = "00";
      seconds = "00";
      appendTens.innerHTML = tens;
      appendSeconds.innerHTML = seconds;
     //reiniciar
     audio2.play();
     alert("GAME OVER");
     document.location.reload();
    
      
  };

  function startTimer() {
      tens++;
      if (tens < 9) {
          appendTens.innerHTML = "0" + tens;
      }
      if (tens > 9) {
          appendTens.innerHTML = tens;
      }
      if (tens > 99) {
          console.log("seconds");
          seconds++;
          appendSeconds.innerHTML = "0" + seconds;
          tens = 0;
          appendTens.innerHTML = "0" + 0;
      }
      if (seconds > 9) {
          appendSeconds.innerHTML = seconds;
      }
  }
};
