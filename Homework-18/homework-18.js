// Задание 01
function testEmail(str) {
    var emailRegex = /^([a-z]{3,10})_([a-z]{3,10})(-\d{4})?@[a-z\d]{1,10}(\.|\-)?[a-z\d]{1,10}(\.com)$/i;
    return emailRegex.test(str);
}

var email = 'name_surname-1234@gmail.com';
console.log(testEmail(email));

// Задание 02
function testPhone(str) {
    var phoneRegex = /^(\+?375-?|8-?0)(25|29|33|44|17)-?[1-9]\d{2}(-?\d{2}){2}$/;
    return phoneRegex.test(str);
}

var phone = '+375-25-777-77-77';
console.log(testPhone(phone));

// Задание 03
function countVowels(str) {
    var vowelsOnly = str.match(/[ёйуеыаоэяию]/ugi);
    return vowelsOnly === null ? 0 : vowelsOnly.length;
}

var text = 'Съешь же ещё этих мягких французских булок, да выпей чаю';
countVowels(text);