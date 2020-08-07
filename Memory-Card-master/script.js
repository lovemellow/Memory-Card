const cardsContainer = document.getElementById('cards-container'),
    cardAddContainer = document.getElementById('add-Container'),
    showBtn = document.getElementById('show'),
    hideBtn = document.getElementById('hide'),
    cardNumEl = document.getElementById('cardNum'),
    cardValiEl = document.getElementById('cardVali'),
    cardPwdEl = document.getElementById('cardPwd'),
    prevBtn = document.getElementById('nav-left'),
    nextBtn = document.getElementById('nav-right'),
    currentEl = document.getElementById('current'),
    addNewBtn = document.getElementById('btn-addNewCard'),
    addBtn = document.getElementById('btn-addCard'),
    clearBtn = document.getElementById('btn-remove');


// Keep track of current card
let currentActiveCard = 0;
 
// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.cardNum}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.cardVali}
    </p>
  </div>
</div>
  `

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}



// Event listeners

// Next button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Prev button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});


function showingAdd() {
    //show add Container
    showBtn.addEventListener('click', () =>
        cardAddContainer.classList.add('show'));
    //hide add Container
    hideBtn.addEventListener('click', () =>
        cardAddContainer.classList.remove('show'));
}


//add new card
function addNewCard() {
    addBtn.addEventListener('click', () => {
        const cardNum = cardNumEl.value;
        const cardVali = cardValiEl.value;
        const cardPwd = cardPwdEl.value;

        if (cardNum.trim() && cardVali.trim() && cardPwd.trim()) {
            const newCard = { cardNum, cardVali, cardPwd };

            createCard(newCard);

            cardNumEl.value = '';
            cardValiEl.value = '';
            cardPwdEl.value = '';

            cardAddContainer.classList.remove('show');

            cardsData.push(newCard);
            setCardData(cardData);
        }
    });
}

//remove card
function clearCard() {
    clearBtn.addEventListener('click', () => {
        localStorage.clear();
        cardsContainer.innerHTML = '';
        window.location.reload();
    });
}

function init() {
    createCards();
    showingAdd();
    addNewCard();
    clearCard();
}


init();