var ejs = require('ejs');
var template = '<%=: price * 1.145 | round:2 %>';
var context = {price: 21};

// Определение функции для объекта ejs.filters
ejs.filters.round = function (number, decimalPlaces) {
    // Первый аргумент – это вводимое значение, контекст // или результат применения предыдущего фильтра
    number = isNaN(number) ? 0 : number;
    decimalPlaces = !decimalPlaces ? 0 : decimalPlaces;
    var multiple = Math.pow(10, decimalPlaces);
    return Math.round(number * multiple) / multiple;
};
console.log(ejs.render(template, context));