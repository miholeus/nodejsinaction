var net = require('net');
net.createServer(function (socket) {
    console.log('socket connected!');
    // Событие data может возникать неоднократно
    socket.on('data', function (data) {
        console.log('"data" event', data);
    });
    // Событие end может возникать только один раз для каждого сокета
    socket.on('end', function () {
        console.log('"end" event');
    });
    // Событие close может возникать только один раз для каждого сокета
    socket.on('close', function () {
        console.log('"close" event');
    });
    // Задаем обработчик ошибок, предотвращающий
    // возможность появления неперехваченных исключений
    socket.on('error', function (e) {
        console.log('"error" event', e);
    });
    socket.pipe(socket);
}).listen(1337);