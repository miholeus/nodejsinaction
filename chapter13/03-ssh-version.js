var net = require('net');
var socket = net.connect({host: process.argv[2], port: process.argv[3] || 22});
socket.setEncoding('utf-8');
socket.once('data', (chunk) => {
    console.log('SSH server version: %j', chunk.trim());
    socket.end();
});