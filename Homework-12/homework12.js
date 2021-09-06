// Задание 1

function collectNames(arr) {
    var namesObjects = arr.map(function(item, i , arr) {
        return {name: item};
    });
    return namesObjects;
}

var namesList = ['Vasya', 'Masha', 'Petya', 'Nastya'];
collectNames(namesList);

// Задание 2

function currentTime(arr) {
    var time = arr.reduce(function(sum, current) {
        return sum + ' : ' + current;
    }, 'Текущее время' );
    return time;
}

var numbers = ['00', '13', '24'];
currentTime(numbers);

// Задание 3
// Не нашёл другого способа, кроме как использовать непройденный нагугленный regexp

// сделать массив с гласными
// и с помощью перебир. методов или двух простых циклов 
// посчитать совпадения

function countVowels(str) {
    var vowels = ['а', 'о', 'и', 'й', 'е', 'ё', 'э', 'ы', 'у', 'ю', 'я'];
    var letters = str.toLowerCase().split('');
    var vowelsCount = 0;

    for (var i = 0; i < letters.length; i++) {
        for (var k = 0; k < vowels.length; k++) {
            if (letters[i] === vowels[k]) {
                vowelsCount++;
            }
        }
    }
    return vowelsCount;
}

var string = 'Съешь же ещё этих мягких французских булок, да выпей чаю';
countVowels(string);

// Задание 4
// Как и в задании 3, использовал regexp

function countSentencesLetters(str) {
    var sentenсes = str.split(/[.!?]/);
    console.log(sentenсes);

    sentenсes.forEach(function(item, i, arr) {
        if (item != '') {
            var letters = item.split(/[.,\s]/).join('');
            
            console.log(item.trim() + ': Letters quantity is: ' + letters.length);
        }
    });
}

countSentencesLetters('Привет, студент! Студент... Как дела, студент?');
