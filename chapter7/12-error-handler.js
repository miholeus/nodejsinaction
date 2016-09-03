var connect = require('connect');
var errorHandler = require('errorhandler');

var app = connect()
    .use(function(req, res, next){
        setTimeout(function(){
            next(new Error('Something broke!'));
        }, 500);
    })
    .use(errorHandler());

app.listen(3000);