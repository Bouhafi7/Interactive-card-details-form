let cardholderName = document.querySelector('#cardholder-name');
let cardNumber = document.querySelector('#card-number');
let monthCard = document.querySelector('#mm');
let yearCard = document.querySelector('#yy');
let cvc = document.querySelector('#cvc-num');
let btn = document.querySelector('.btn');
let secondBtn = document.querySelector('.s-btn');

let cardContainer = document.querySelector('.form form');
let doneContainer = document.querySelector('.done');

let numberOnCard = document.querySelector('.card-numbers');
let nameOnCard = document.querySelector('.card-holder');
let monthOnCard = document.querySelector('.theMonth');
let yearOnCard = document.querySelector('.theYear');
let cvcOnCard = document.querySelector('.cvc');


btn.addEventListener('click', (e) => {
    e.preventDefault();
    dealCard();
});


secondBtn.addEventListener('click', emptyFilels);

function dealCard() {
    const nameRegex = /[a-z]+(?!=\d)\s[a-z]+(?!=\d)/ig;
    const cardNumberRegex = /\d{4}\s\d{4}\s\d{4}\s\d{4}/ig;
    const monthcardRegex = /\d{2}/;
    const yearcardRegex = /\d{2}/;
    const cvcRegex = /([0-9]{3})/;

    let cardHolderError = document.querySelector('.cardHolderError');
    let cardNumberError = document.querySelector('.cardNumberError');
    let monthcardError = document.querySelector('.monthError');
    let yearcardError = document.querySelector('.yearError');
    let cvcError = document.querySelector('.cvcError');

    if(!cardholderName.value){
        cantBlack(cardholderName, cardHolderError, nameOnCard ,onCard='jane appleseed');
    } else if (!nameRegex.test(cardholderName.value)) {
        wrongFormat(cardholderName, cardHolderError, errMsg = 'Name is not valid', nameOnCard, onCard = 'jane appleseed');
    } else {
        valid(cardholderName, cardHolderError, nameOnCard, cardholderName);
    }

    if (!cardNumber.value) {
        cantBlack(cardNumber, cardNumberError, numberOnCard, onCard='0000 0000 0000 0000');
    } else if ((/[a-z]/ig).test(cardNumber.value)) {
        wrongFormat(cardNumber, cardNumberError, errMsg = 'Wrong format, numbers only', numberOnCard, onCard = '0000 0000 0000 0000');
    } else if (!cardNumberRegex.test(cardNumber.value)) {
        wrongFormat(cardNumber, cardNumberError, errMsg = 'Wrong format', numberOnCard, onCard = '0000 0000 0000 0000');
    } else {
        valid(cardNumber, cardNumberError, numberOnCard, cardNumber);
    }

    if (!monthCard.value) {
        cantBlack(monthCard, monthcardError, monthCard, onCard='00');
    } else if (!monthcardRegex.test(monthCard.value)) {
        wrongFormat(monthCard, monthcardError, errMsg = 'Wrong format', monthOnCard, onCard = '00');
    } else if (monthCard.value > 12 || monthCard.value <= 0 || (yearCard.value == 23 && monthCard.value <= 3)) {
        wrongFormat(monthCard, monthcardError, errMsg = 'Month invalid', monthOnCard, onCard = '00');
    } else {
        valid(monthCard, monthcardError, monthOnCard, monthCard);
    }

    if (!yearCard.value) {
        cantBlack(yearCard, yearcardError, yearCard, onCard='00');
    } else if (!yearcardRegex.test(yearCard.value)) {
        wrongFormat(yearCard, yearcardError, errMsg = 'Wrong format', yearOnCard, onCard = '00');
    } else if (yearCard.value < 23 || yearCard.value >= 40) {
        wrongFormat(yearCard, yearcardError, errMsg = 'Year invalid', yearOnCard, onCard = '00');
    } else {
        valid(yearCard, yearcardError, yearOnCard, yearCard);
    }

    if (!cvc.value) {
        cantBlack(cvc, cvcError, cvc, onCard='000');
    } else if (!cvcRegex.test(cvc.value)) {
        wrongFormat(cvc, cvcError, errMsg = 'Wrong format, numbers only', cvcOnCard, onCard = '000');
    } else if (cvc.value > 1000) {
        wrongFormat(cvc, cvcError, errMsg = 'Wrong format', cvcOnCard, onCard = '000');
    } else {
        valid(cvc, cvcError, cvcOnCard, cvc);
    }

    if (nameOnCard.innerText.toLowerCase() == 'jane appleseed' || numberOnCard.innerText == '0000 0000 0000 0000' || monthOnCard.innerText == '00' || yearOnCard.innerText == '00' || cvcOnCard.innerText == '000') {
        nameOnCard.innerText = 'jane appleseed';
        numberOnCard.innerText = '0000 0000 0000 0000';
        monthOnCard.innerText = '00'
        yearOnCard.innerText = '00';
        cvcOnCard.innerText = '000';
        doneContainer.classList.remove('active');
        cardContainer.style.display = 'block';
    }
    else {
        doneContainer.classList.add('active');
        cardContainer.style.display = 'none';
    }
};

function cantBlack(input, err, card, onCard) {
    input.style.outline = '2px solid hsl(0, 100%, 66%)';
    err.style.display = 'block';
    err.textContent = "Can't be black";
    card.innerText = onCard;
}

function wrongFormat(input, err, errMsg, card, onCard) {
    input.style.outline = '2px solid hsl(0, 100%, 66%)';
    err.style.display = 'block';
    err.textContent = errMsg;
    card.innerText = onCard;
}

function valid(input, err, card, onCard) {
    input.style.outline = 'none';
    err.style.display = 'none';
    card.innerText = onCard.value;
}

function emptyFilels() {
    doneContainer.classList.remove('active');
    cardContainer.style.display = 'block';
    cardholderName.value = '';
    cardNumber.value = '';
    monthCard.value = '';
    yearCard.value = '';
    cvc.value = '';
}