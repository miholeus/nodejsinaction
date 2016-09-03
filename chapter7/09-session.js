var connect = require('connect');
var favicon = require('connect-favicons');
var cookieParser = require('cookie-parser');
var connectSession = require('connect-session'),
    session = connectSession.session;

// @todo this demo is not working properly!!!
var app = connect()
    //.use(favicon())
    .use(cookieParser('keyboard cat'))
    .use(session())
    .use(function(req, res){
        var sess = req.session;
        console.log(sess);
        if (sess.views) {
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>views:' + sess.views + '</p>');
            res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
            res.write('<p>httpOnly: ' + sess.cookie.httpOnly + '</p>');
            res.write('<p>path: ' + sess.cookie.path + '</p>');
            res.write('<p>domain: ' + sess.cookie.domain + '</p>');
            res.write('<p>secure: ' + sess.cookie.secure + '</p>');
            res.end();
            sess.views++;
        } else {
            sess.views = 1;
            res.end('Welcome to the session demo. Refresh!');
        }
    });

app.listen(3000);