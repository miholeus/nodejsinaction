var ejs = require('ejs');
var fs = require('fs');
var http = require('http');
// Местоположение файла шаблона
var filename = './template/students.ejs';
// Данные, передаваемые шаблонизатору
var students = [
    {name: 'Rick LaRue', age: 23}, {name: 'Sarah Cathands', age: 25}, {name: 'Bob Dobbs', age: 37}
];
var cache = process.env.NODE_ENV == 'production';
// Создание HTTP-сервера
var server = http.createServer(function(req, res) {
    if (req.url == '/') {
        // Считывание шаблона из файла
        fs.readFile(filename, function(err, data) {
            var template = data.toString();
            var context = {students: students, cache: cache, filename: filename};
            // Визуализация шаблона
            var output = ejs.render(template, context);
            res.setHeader('Content-type', 'text/html');
            // Отправка HTTP-ответа
            res.end(output);
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});
server.listen(8000);