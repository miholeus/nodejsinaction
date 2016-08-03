var net = require('net');

var server = net.createServer(function(socket){
    // Событие дата будет обработано только один раз
    socket.once('data', function(data){
        socket.write(data);
    });
});

server.listen(8888);