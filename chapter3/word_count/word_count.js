var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordsCount = {};
var filesDir = './text';

function checkIfComplete() {
    completedTasks++;
    if (completedTasks == tasks.length) {
        for (var index in wordsCount) {
            console.log(index + ':' + wordsCount[index]);
        }
    }
}

function countWordsInText(text) {
    var words = text.toString().toLowerCase().split(/\W+/).sort();
    for (var index in words) {
        var word = words[index];
        if (word) {
            wordsCount[word] = (wordsCount[word]) ? wordsCount[word] + 1 : 1;
        }
    }
}

// Получение списка текстовых файлов в папке
fs.readdir(filesDir, function(err, files){
    if (err) throw err;
    for (var index in files) {
        var task = function(file) {
            return function(){
                fs.readFile(file, function(err, text){
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        }(filesDir + '/' + files[index]);
        // Добавление каждой операции в массив функций, вызываемых в параллельном режиме
        tasks.push(task);
    }

    for (var task in tasks) {
        tasks[task]();
    }
});