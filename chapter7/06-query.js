var connect = require('connect');
var query = require('connect-query');

var app = connect()
    .use(query())
    .use(function(req, res){
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(req.query));
    });
app.listen(3000);