var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

// Добавление слушателя для события join, сохраняющего клиентский объект пользователя,
// что позволяет приложению отсылать данные обратно пользователю
channel.on('join', function(id, client){
    this.clients[id] = client;
    var self = this;
    console.log("joined " + id);
    this.subscriptions[id] = function(senderId, message) {
        // Игнорируем данные, непосредственно транслируемые пользователем
        if (id != senderId) {
            self.clients[id].write(message);
        }
    };

    // Добавление слушателя события broadcast для текущего пользователя
    this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id){
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', function(){
    channel.emit("broadcast", '', "Chat has shut down\n");
    channel.removeAllListeners('broadcast');
});

var server = net.createServer(function(client){
    var id = client.remoteAddress + ':' + client.remotePort;
    /*
    client.on('connect', function(){
        // Генерируем событие join после подключения пользователя к серверу, указывая идентификатор пользователя
        // и клиентский объект
        channel.emit('join', id, client);
    });
     */
    channel.emit('join', id, client);

    client.on('data', function(data){
        data = data.toString();
        // Генерируем событие broadcast для канала, задавая идентификатор пользователя и сообщение,
        // когда какой-либо пользователь отсылает данные
        if (data.trim() == '/quit') {
            client.destroy();
            return;
        }
        if (data.trim() == '/shutdown') {
            channel.emit("shutdown");
        }
        channel.emit('broadcast', id, data);
    });

    client.on('close', function(){
        // Генерирование события leave после отключения клиента
        channel.emit('leave', id);
    });
});

server.listen(8888);