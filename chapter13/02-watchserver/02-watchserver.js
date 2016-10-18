var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');
var express = require('express');
// Создание сервера Express-приложений
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var root = __dirname;

// Использование компонента промжуточного уровня, чтобы
// начать мониторинг файлов, возвращаемых статическим
// программным обеспечением промежуточного уровня
app.use(function(req, res, next){
    var file = url.parse(req.url).pathname;
    var mode = 'stylesheet';
    if (file[file.length - 1] == '/') {
        file += 'index.html';
        mode = 'reload';
    }
    // Идентификация имени файла, обслуживаемого и вызываемого
    // функцией createWatcher()
    createWatcher(file, mode);
    next();
});

app.use(express.static(root));

// Поддержка списка отслеживаемых активных файлов
var watchers = {};

function createWatcher(file, event) {
    var absolute = path.join(root, file);
    if (watchers[absolute]) {
        return;
    }
    // Начало мониторинга файла на предмет изменений
    fs.watchFile(absolute, function(curr, prev){
        if (curr.mtime != prev.mtime) {
            io.sockets.emit(event, file);
        }
    });
    // Пометка файла как отслеживаемого
    watchers[absolute] = true;
}

server.listen(8080);