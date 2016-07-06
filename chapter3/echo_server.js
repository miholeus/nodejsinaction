var net = require('net');

var server = net.createServer(function(socket){
    console.log("Connected: " + socket.remoteAddress + ':' + socket.remotePort);
    socket.on('data', function(data){
        socket.write(data);
    });
});

server.listen(8888);