var connect = require('connect');
var basicAuth = require('basic-auth-connect');

var users = {
    tobi: 'foo', loki: 'bar', jane: 'baz'
};

var app = connect()
    .use(basicAuth(function(user, pass){
        return users[user] == pass;
    }));

app.listen(3000);