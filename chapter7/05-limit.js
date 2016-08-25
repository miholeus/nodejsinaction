var connect = require('connect');
var bodyParser = require('body-parser');
var limit = require('./middleware/limit');

function type(type, fn) {
    return function(req, res, next) {
        var ct = req.headers['content-type'] || '';
        if (0 != ct.indexOf(type)) {
            return next();
        }
        fn(req, res, next);
    }
}

var app = connect()
    .use(type('application/x-www-form-urlencoded', limit('64kb')))
    .use(type('application/json', limit('32kb')))
    .use(type('image', limit('2mb')))
    .use(type('video', limit('300mb')))
    .use(bodyParser())
    .use(function(req, res){
        res.end("Hello,\n");
    });
app.listen(3000);