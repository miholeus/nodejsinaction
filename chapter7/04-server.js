var connect = require('connect');
var bodyParser = require('body-parser');
var limit = require('./middleware/limit');

var app = connect()
    .use(limit('32kb'))
    .use(bodyParser());
app.listen(3000);