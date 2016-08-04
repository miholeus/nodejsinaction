var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req, res){
    var url = parse(req.url);
    var path = join(root, url.pathname);

    fs.exists(path, function(exists){
        if (exists) {
            var stream = fs.createReadStream(path);
            stream.pipe(res);

            stream.on('error', function(err){
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        } else {
            res.statusCode = 404;
            res.end("404 Not Found");
        }
    });

});

server.listen(3000);