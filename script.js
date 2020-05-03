const cardContainer = document.getElementById('card-container'),
    cardAddContainer = document.getElementById('add-Container'),
    showBtn = document.getElementById('show'),
    hideBtn = document.getElementById('hide'),
    prevBtn = document.getElementById('nav-left'),
    nextBtn = document.getElementById('nav-right'),
    currentEI = document.getElementById('current'),
    addNewBtn = document.getElementById('btn-addNewCard'),
    addBtn = document.getElementById('btn-addCard'),
    clearBtn = document.getElementById('btn-remove');



function showingCard() {
    //show add Container
    showBtn.addEventListener('click', () =>
        cardAddContainer.classList.add('show'));
    //hide add Container
    hideBtn.addEventListener('click', () =>
        cardAddContainer.classList.remove('show'));
}



function init() {
    showingCard();
}

init();