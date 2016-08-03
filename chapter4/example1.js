var http = require('http');

var server = http.createServer(function(req, res){
    res.setHeader('Content-type', 'text/plain');
    var body = "Hello, world\n";
    res.setHeader('Content-Length', body.length);
    res.write(body);
    res.end();
});
server.listen(3000);