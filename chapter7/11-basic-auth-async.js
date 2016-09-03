var connect = require('connect');
var basicAuth = require('basic-auth-connect');

var users = {
    tobi: 'foo', loki: 'bar', jane: 'baz'
};

var User = {
    authenticate: function(options, cb) {
        var user = options.user;
        var pass = options.pass;
        if (users[user] == pass) {
            return cb(null, user);
        }
        return cb(new Error('User not found'));
    }
};

var app = connect()
    .use(basicAuth(function(user, pass, callback){
        User.authenticate({user: user, pass: pass}, gotUser);

        function gotUser(err, user) {
            if (err) return callback(err);

            callback(null, user);
        }
    }));

app.listen(3000);