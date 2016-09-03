var connect = require('connect');
var logger = require('connect-logger');

function hello(req, res){
    res.end("Hello, world\n");
}

var app = connect()
    .use(logger())
    .use(hello)
    .listen(3000);