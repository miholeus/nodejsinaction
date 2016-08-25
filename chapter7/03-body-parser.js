var connect = require('connect');
var bodyParser = require('body-parser');

var app = connect()
    .use(bodyParser())
    .use(function(req, res){
        res.end("Registered new user: " + req.body.username);
    });
app.listen(3000);