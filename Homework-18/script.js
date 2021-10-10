var inputEmail = document.getElementById('input-email');
var inputPhone = document.getElementById('input-phone');
var inputText = document.getElementById('input-text');

// Проверяем имейл по keyup
inputEmail.onkeyup = function(event) {
    var emailRegex = /^([a-zA-Z]{3,10})_([a-zA-Z]{3,10})(-\d{4})?@(?![\.\-])([a-zA-Z0-9\.\-]{2,20})(?<![\.\-])(\.com)$/;

    if (!inputEmail.value.split(' ').join('')) {
        inputEmpty(event);
    } else if (emailRegex.test(inputEmail.value) ) {
        inputCorrect(event);
    } else if (!emailRegex.test(inputEmail.value) ) {
        inputIncorrect(event);
    }
}

// Проверяем телефон по keyup
inputPhone.onkeyup = function(event) {
    var phoneRegex = /^(((\+)?375(-)?)|8(-)?0)(25|29|33|44|17)(-)?([0-9]{3})(-)?([0-9]{2})(-)?([0-9]{2})$/;

    if (!inputPhone.value.split(' ').join('')) {
        inputEmpty(event);
    } else if (phoneRegex.test(inputPhone.value) ) {
        inputCorrect(event);
    } else if (!phoneRegex.test(inputPhone.value) ) {
        inputIncorrect(event);
    }
}

// Считаем гласные по keyup
inputText.onkeyup = function(event) {
    var vowelsCount = countVowels(event.target.value);
    var statusText = event.target.nextSibling.nextSibling;

    if (!event.target.value.split(' ').join('')) {
        inputEmpty(event);
    } else if (vowelsCount) {
        statusText.innerHTML = '<span class="material-icons">spellcheck</span><span>The amount of vowels is </span><span> ' + vowelsCount + '.</span>';
        statusText.style.color = '#17A589';
    } else if (vowelsCount === 0) {
        statusText.innerHTML = '<span class="material-icons">spellcheck</span><span>The amount of vowels is </span><span> ' + vowelsCount + '.</span>';
        statusText.style.color = '#17A589';
    }
}

function inputCorrect(e) {
    var statusText = e.target.nextSibling.nextSibling;
    statusText.innerHTML = '<span class="material-icons">check_circle</span><span>The value is correct.</span>';
    statusText.style.color = '#17A589';
}

function inputIncorrect(e) {
    var statusText = e.target.nextSibling.nextSibling;
    statusText.innerHTML = '<span class="material-icons">highlight_off</span><span>The value is incorrect.</span>';
    statusText.style.color = '#CB4335';
}

function inputEmpty(e) {
    var statusText = e.target.nextSibling.nextSibling;
    statusText.innerHTML = '<span class="material-icons">help</span><span>The field is empty.</span>';
    statusText.style.color = '#B3B6B7';
}

function countVowels(str) {
    var vowelsOnly = str.match(/[aeiou]/ugi);
    return vowelsOnly === null ? 0 : vowelsOnly.length;
}