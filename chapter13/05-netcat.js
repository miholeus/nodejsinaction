var net = require('net');
var host = process.argv[2];

// Синтаксический разбор в аргументах командной // строки аргументов host и port
var port = Number(process.argv[3]);
// Создаем экземпляр socket и начинаем подключение к серверу
var socket = net.connect(port, host);
// Обрабатываем событие connect при установлении соединения с сервером
socket.on('connect', function () {
    // Направляем поток stdin процесса в сокет
    process.stdin.pipe(socket);
    // Направляем данные сокета в поток stdout процесса
    socket.pipe(process.stdout);
    // Вызываем resume() для потока stdin, чтобы начать считывать данные
    process.stdin.resume();
});

// Приостанавливаем поток sdtdin в случае события end
socket.on('end', function () {
    process.stdin.pause();
});