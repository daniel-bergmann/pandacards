document.addEventListener('DOMContentLoaded', () => {
  // card option
  const cardArray = [
    {
      name: 1,
      img: 'img/1.png',
    },
    {
      name: 1,
      img: 'img/1.png',
    },
    {
      name: 2,
      img: 'img/2.png',
    },
    {
      name: 2,
      img: 'img/2.png',
    },
    {
      name: 3,
      img: 'img/3.png',
    },
    {
      name: 3,
      img: 'img/3.png',
    },
    {
      name: 4,
      img: 'img/4.png',
    },
    {
      name: 4,
      img: 'img/4.png',
    },
    {
      name: 5,
      img: 'img/5.png',
    },
    {
      name: 5,
      img: 'img/5.png',
    },
    {
      name: 6,
      img: 'img/6.png',
    },
    {
      name: 6,
      img: 'img/6.png',
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // creating the board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'img/panda.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      // append child places all the src in each card element
      grid.appendChild(card);
    }
  }

  //   check for matches
  function checkForMatch() {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1]) {
      //   alert('You found a match! 加油！🎉');
      cards[optionOneId].setAttribute('src', 'img/white.png');
      cards[optionTwoId].setAttribute('src', 'img/white.png');
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', 'img/panda.png');
      cards[optionTwoId].setAttribute('src', 'img/panda.png');
      //   alert('sorry, try again, 加油！💪');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = 'Ver gert snillingur!!! 加油！🎉🎉🎉💪💪💪';
    }
  }

  //   flip the card
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    // this.setAttribute will let us add an image to that square based on the card id it holds
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  createBoard();
});
