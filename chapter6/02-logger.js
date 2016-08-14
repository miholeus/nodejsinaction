var connect = require("connect");
function logger(req, res, next) {
    console.log("%s %s", req.method, req.url);
    next();
}
function hello(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, world\n");
}
var app = connect();
app.use(logger).use(hello).listen(3000);