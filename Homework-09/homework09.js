// Первая часть домашки. Пишем единый геттер-сеттер
function Cat(name) {
    var foodAmount = 0;

    function formatFoodAmount() {
        return foodAmount + ' гр.';
    }

    this.dailyNorm = function(amount) {
        // Режим геттера
        if (!arguments.length) return formatFoodAmount();

        // Режим сеттера
        if (amount < 50) {
            throw new Error('Нельзя меньше 50!');
        }
        if (amount > 500) {
            throw new Error('Нельзя больше 500!');
        }

        foodAmount = amount;
    }

    this.name = name;

    this.feed = function(amount) {
        // Передаю количество корма на проверку в соответствии с нормой
        this.dailyNorm(amount);
        // Если всё окей - насыпаем корм
        // Иначе выкинет ошибку
        console.log('Насыпаем в миску ' + formatFoodAmount() + ' корма.');
    };
}

var barsik = new Cat('Барсик');

// Проверка с единым геттером-сеттером
console.log(barsik.name);
console.log(barsik.feed(250) ); // При пустом аргументе - выдаст 'undefined'
