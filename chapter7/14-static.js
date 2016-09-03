var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');

var app = connect()
    .use(serveIndex('public'))
    .use(serveStatic('public'));

app.listen(3000);

