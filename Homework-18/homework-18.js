// Задание 01
function testEmail(str) {
    var emailRegex = /^([a-zA-Z]{3,10})_([a-zA-Z]{3,10})(-\d{4})?@(?![\.\-])([a-zA-Z0-9\.\-]{2,20})(?<![\.\-])(\.com)$/;
    return emailRegex.test(str);
}

var email = 'name_surname-1234@gmail.com';
console.log(testEmail(email));

// Задание 02
function testPhone(str) {
    var phoneRegex = /^(((\+)?375(-)?)|8(-)?0)(25|29|33|44|17)(-)?([0-9]{3})(-)?([0-9]{2})(-)?([0-9]{2})$/;
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