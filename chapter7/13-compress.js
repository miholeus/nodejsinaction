var connect = require('connect');
var serveStatic = require('serve-static');
var compression = require("compression");

var app = connect()
    .use(compression({level: 3, memLevel: 8}))
    .use(serveStatic('public'));

app.listen(3000);

