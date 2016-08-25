var connect = require('connect');

function errorHandler() {
    var env = process.env.NODE_ENV || 'development';
    return function(err, req, res, next) {
        res.statusCode = 500;
        switch (env) {
            case 'development':
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end("Server error");
        }
    }
}
connect()
    .use(function(req, res){
        foo();// error here
})
    .use(errorHandler())
    .listen(3000);