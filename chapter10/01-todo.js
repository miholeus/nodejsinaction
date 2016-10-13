function Todo() {
    this.todos = [];
}

// Добавляем элемент в список
Todo.prototype.add = function(item) {
    if (!item) throw new Error("Todo#add requires item");
    this.todos.push(item);
};

// Удаляем все элементы из списка
Todo.prototype.deleteAll = function() {
    this.todos = [];
};

// Подсчитываем количество элементов списка
Todo.prototype.getCount = function() {
    return this.todos.length;
};

// Через 2 секунды обратный вызов со значением "true"
Todo.prototype.doAsync = function(cb) {
    setTimeout(cb, 2000, true);
};

module.exports = Todo;