var http = require('http');

function fib(n) {
    if (n < 2) {
        return 1;
    }
    return fib(n-2) + fib(n-1);
}

http.createServer((req, res) => {
    var num = parseInt(req.url.substring(2), 10);
    if (isNaN(num)) {
        res.writeHead(400);
        res.end("Wrong number provided");
    } else {
        res.writeHead(200);
        res.end(fib(num) + "\n");
    }
}).listen(8000);