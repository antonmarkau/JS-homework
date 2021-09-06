// Задание 1
function filterNumbersArr(numbers) {
    var newArr = numbers.filter(function(number) {
        return number > 0;
    });
    return newArr;
}

console.log(filterNumbersArr([-1, 0, 2, 34, -2]));

// Задание 2
function firstPositiveNumber(numbers) {
    var newArr = numbers.filter(function(number) {
        return number > 0;
    });
    return newArr[0];
}

console.log(firstPositiveNumber([-6, 0, -46, 0, 42, -3, 0, 5, 59]));

// Задание 3
function isPalindrome(word) {
    var reversedWord = word.toLowerCase().split('').reverse().join('');

    return word.toLowerCase() == reversedWord;
}

console.log(isPalindrome('шалаШ')); // true
console.log(isPalindrome('привет')); // false

// Задание 4
function areAnagrams(firstWord, secondWord) {
    var a = firstWord.toLowerCase().split('').sort().join('');
    var b = secondWord.toLowerCase().split('').sort().join('');

    return a == b;
}

console.log(areAnagrams('кот', 'отк')); // true
console.log(areAnagrams('кот', 'атк')); // false
console.log(areAnagrams('кот', 'отко')); // false

// Задание 5
function divideArr(arr, size) {
    var slicedArr = [];

    for (var i = 0; i < arr.length; i += size) {
        slicedArr.push(arr.slice(i, i + size) );
    }
    return slicedArr;
}

console.log(divideArr([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]
