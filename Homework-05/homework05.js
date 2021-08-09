// 01
function isEmpty(obj) {
    for (var k in obj) {
        return false;
    }
    return true;
}

var ages = {};
alert(isEmpty(ages));
ages['Anton'] = '27';
alert(isEmpty(ages));

// 02
function pow(x, n) {
    // Задаю переменную 'result' чтобы выдавать её при степени 1, и чтобы не менять 'x' за пределами функции
    var result = x;

    // Проверка степени на число, и на >= 1
    while (n < 1 || isNaN(n) || n % 1 != 0) {
        alert('Введите натуральное число.\n(Целое число, от 1 и выше).');
        n = +prompt('Введите степень.');
    }
    
    // Возведение в степень
    for(var i = 1; i < n; i++) {
    result *= x;
    }
    return result;
}

var x = +prompt('Введите число.'),
    n = +prompt('Введите степень.');
alert(pow(x, n));

var x = +prompt('Введите число.'),
    n = +prompt('Введите степень.');
alert(pow(x, n));

// 03
// Вариант решения с использованием цикла
function sumTo(n) {
    var sum = 0;
    for(var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

alert(sumTo(1));
alert(sumTo(2));
alert(sumTo(3));
alert(sumTo(4));
alert(sumTo(100));

// Вариант решения через рекурсию
function sumTo(n) {
    // Для n = 1
    if (n == 1) return 1;
    // Для n > 1
    return n + sumTo(n - 1);
}

alert(sumTo(1));
alert(sumTo(2));
alert(sumTo(3));
alert(sumTo(4));
alert(sumTo(100));

// Вариант решения через использование формулы для суммы  арифметической прогрессии
function sumTo(n) {
    return n * (n + 1) / 2;
}

alert(sumTo(1));
alert(sumTo(2));
alert(sumTo(3));
alert(sumTo(4));
alert(sumTo(100));

/*
Ответы на вопросы:
Q: Какой вариант решения самый быстрый?
    Самый медленный?
    Почему?
A: Самый быстрый - через использование 
    формулы для суммы  арифметической прогрессии.
    Потому что это просто формула, не вовлекающая
    никаких циклов.
    Самый медленный - через рекурсию. 
    Потому что мало того что есть цикл, так
    ещё есть и новый вызов функции.
Q: Можно ли при помощи рекурсии посчитать sumTo(100000)? 
    Если нет, то почему?
A: Ответ не знал, посмотрел в интернете. Как я понял,
    посчитается, но далеко не во всех движках. Большинство 
    движков выдадут "максимальный размер стека превышен".
    Это связано с требованием к памяти. Большинство движков 
    будут запоминать контекст выполнения всех вункций.

*/

// 04
function treeSum (arr) {

    var sum = 0;
    
    for(var i = 0; i < arr.length; i++) {
        // Working with number
        if(typeof(arr[i] ) === 'number' && arr[i] != isNaN) {
            sum += arr[i];
        }
        // Working with array
        else if(typeof(arr[i] ) === 'object' && arr[i] != null && arr[i].length != undefined  && arr[i] != isNaN) {
            sum += treeSum(arr[i] );
        }
    }

    return sum;
}

var check = [
    5, 7,
    [4, [2], 8, [1, 3], 2],
    null, false, 'ghggh',
    [9, []],
    1, 8
    ]; // Should be '50'

alert(treeSum(check) );