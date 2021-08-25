// Задание 1
function filterNumbersArr(numbers) {
    var newArr = [];

    numbers.forEach(function(item, i, numbers) {
        if (item > 0) {
            newArr[newArr.length] = item;
        }
    });
    return newArr;
}

console.log(filterNumbersArr([-1, 0, 2, 34, -2]));

// Задание 2
firstPositiveNumber = function(numbers) {
    var positiveNumber;

    numbers.forEach(function(item, i, numbers) {
        if (!positiveNumber && item > 0) {
            positiveNumber = item;
        }
    });
    return positiveNumber;
}

console.log(firstPositiveNumber([-6, 0, -46, 0, 42, -3, 0, 5, 59]));

// Задание 3
isPalindrome = function(word) {
    var originalWord = word.toLowerCase();
    var reversedWord = originalWord.split('').reverse().join('');

    if (originalWord == reversedWord) {
        return true;
    } else {
        return false;
    }
}

console.log(isPalindrome('шалаШ')); // true
console.log(isPalindrome('привет')); // false

// Задание 4
areAnagrams = function(firstWord, secondWord) {
    var a = firstWord.toLowerCase().split('').sort().join('');
    var b = secondWord.toLowerCase().split('').sort().join('');

    if (a === b) {
        return true;
    } else {
        return false;
    }
}

console.log(areAnagrams('кот', 'отк')); // true
console.log(areAnagrams('кот', 'атк')); // false
console.log(areAnagrams('кот', 'отко')); // false

// Задание 5
divideArr = function(arr, size) {
    var slicedArr = [];

    for (var i = 0; i < arr.length; i += size) {
        slicedArr.push(arr.slice(i, i + size) );
    }
    return slicedArr;
}

console.log(divideArr([1, 2, 3, 4], 2)); // [[1, 2], [3, 4]]
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]
