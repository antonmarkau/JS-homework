var button = document.getElementById('buttonCreate');
var inputX = document.getElementById('inputX');
var inputY = document.getElementById('inputY');

var form = Array.from(document.getElementsByTagName('form')).filter(function(element) {
    return element.tagName == 'FORM';
})[0];

var inputs = Array.from(document.getElementsByTagName('input')).filter(function(element) {
    return element.tagName == 'INPUT';
});

// Делаем кнопку активной, если в input не пустая строка
inputs.forEach(function(item) { // Для каждого input
    item.onkeyup = function() { // На keyup

        function isEmpty(input) { // Функция детекции пустго input
            var value = input.value.split(' ').join('');
            if (value == '') {
                return true;
            } else {
                return false;
            }
        }

        if (inputs.some(isEmpty)) { // Если хоть один input пустой
            button.disabled = true;
        } else {
            button.disabled = false;
        }

    }
});

// Клик по активной кнопке
button.onclick = function() {
    // Собираю данные из input x и y
    var x = inputX.value;
    var y = inputY.value;

    // Функция проверки валидности данных в input
    function isCorrectValue(input) {
        var value = input.value.split(' ').join('');
        if (value != 0 && value <= 10 && +value != 'NaN') {
            return true;
        } else {
            return false;
        }
    }

    // Функция рисования таблицы
    function drawTable(width, height) {
        // Если есть старая таблица - удаляем
        var tableContainerOld = document.getElementById('container');
        if (tableContainerOld) {
            tableContainerOld.remove();
        }

        // Создаём новый контейнер
        var tableContainer = document.createElement('div');
        tableContainer.className = ('container');
        tableContainer.id = ('container');
        form.after(tableContainer);

        // Делаем строки
        for (var i = 0; i < height; i++) {
            var row = document.createElement('div');
            tableContainer.append(row);
            row.className = ('row');

            // Наполняем строки квадратами
            if (i % 2 == 0) { // Для чётной строки
                for (var k = 0; k < width; k++) {
                    if (k % 2 == 0) { // Для чётного квадрата
                        var squareBlack = document.createElement('div');
                        squareBlack.className = ('squareBlack');
                        row.append(squareBlack);
                    } else { // Для нечётного квадрата
                        var squareWhite = document.createElement('div');
                        squareWhite.className = ('squareWhite');
                        row.append(squareWhite);
                    }
                }
            } else { // Для нечётной строки
                for (var k = 0; k < width; k++) {
                    if (k % 2 == 0) { // Для чётного квадрата
                        var squareWhite = document.createElement('div');
                        squareWhite.className = ('squareWhite');
                        row.append(squareWhite);
                    } else { // Для нечётного квадрата
                        var squareBlack = document.createElement('div');
                        squareBlack.className = ('squareBlack');
                        row.append(squareBlack);
                    }
                }
            }

        }

    }

    // Выполнение задачи
    if (inputs.every(isCorrectValue)) { // Если все input валидны
        drawTable(x, y); // Рисуем таблицу
    } else { // Если хоть один input не валиден
        alert('Enter the numbers from 1 to 10.'); // Выдаём alert
    }

    // Добавляю к созданному контейнеру событие по клику
    container.onclick = function(event) {
        var target = event.target;
        if (target.tagName != 'DIV') return;
        changeColors(); // Поменять цвета
    }

    // Функция смены цвета
    function changeColors() {
        // Получаю массив с дивами в container
        var squares = Array.from(document.getElementsByTagName('div')).filter(function(element) {
            return element.tagName == 'DIV';
        });

        // Ищу дивы с нужным className и меняю их className на другой
        squares.forEach(function(item) {
            if (item.classList.contains('squareWhite')) {
                item.classList.remove('squareWhite');
                item.className = ('squareBlack');
            } else if (item.classList.contains('squareBlack')) {
                item.classList.remove('squareBlack');
                item.className = ('squareWhite');
            }
        });
    }

}
