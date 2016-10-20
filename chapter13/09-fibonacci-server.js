var http = require('http');
var cp = require('child_process');
var path = require('path');

http.createServer((req, res) => {
    var child = cp.fork(`${__dirname}/09-fibonacci-calc.js`);
    child.on('message', (m) => {
        res.writeHead(200);
        res.end(m.result + "\n");
    });
    child.send({number: req.url.substring(2)});
}).listen(8000);