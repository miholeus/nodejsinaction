var connect = require('connect');
var cookieParser = require('cookie-parser');

var app = connect()
    .use(cookieParser('tobi is a cool ferret'))
    .use(function(req, res){
        console.log(req.cookies);
        console.log(req.signedCookies);
        res.end("hello\n");
    });
app.listen(3000);