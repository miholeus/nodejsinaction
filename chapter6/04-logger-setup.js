var connect = require("connect");

function hello(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, world\n");
}
function setup(format) {
    var regex = /:(\w+)/g;
    return function logger(req, res, next) {
        var str = format.replace(regex, function (match, property){
            return req[property];
        });
        console.log(str);
        next();
    }
}
module.exports = setup;

var app = connect();
app.use(setup(':method :url')).use(hello).listen(3000);