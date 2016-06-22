var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var server = http.createServer(function(req, res) {
    var filePath = false;
    if (req.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + req.url;
    }
    var absPath = './' + filePath;
    // Обслуживание статического файла
    serveStatic(res, cache, absPath);
});

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: Resource Not Found');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
    // Проверка факта кэширования файла в памяти
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        // Проверка факта существования файла
        fs.exists(absPath, function(exists){
            if (exists) {
                // Считывание файла с диска
                fs.readFile(absPath, function(err, data){
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        // Обслуживание файла с диска
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        })
    }
}

server.listen(3000, function(){
    console.log("Server listening on http://localhost:3000");
});
