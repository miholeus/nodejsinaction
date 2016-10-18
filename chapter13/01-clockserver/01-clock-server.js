var app = require('http').createServer(handler);
// Наращиваем обычный HTTP-сервер до Socket.IO-сервера
var io = require('socket.io').listen(app);
var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf-8');

function handler(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html, 'utf-8'));
    res.end(html);
}

function tick() {
    var now = new Date().toUTCString();
    // Отправляем показания времени всем подключенным сокетам
    io.sockets.send(now);
}

setInterval(tick, 1000);
app.listen(8080, function(){
    console.log("info - socket.io started");
});