var net = require('net');
var redis = require('redis');

var server = net.createServer(function(socket){
    var subscriber;
    var publisher;


    subscriber = redis.createClient();
    subscriber.subscribe('main_chat_room');

    // Если сообщение получено из канала показываем его пользователю
    subscriber.on("message", function(channel, message){
        socket.write('Channel ' + channel + ': ' + message);
    });

    publisher = redis.createClient();


    socket.on('data', function(data){
        data = data.toString();
        if (data.trim() == '/quit') {
            socket.destroy();
            return;
        }
        // Публикация сообщения, введенного пользователем
        publisher.publish('main_chat_room', data);
    });

    socket.on('end', function(){
        subscriber.unsubscribe('main_chat_room');
        subscriber.end();
        publisher.end();
    })
});

server.listen(3000, function(){
    console.log("Server started");
});