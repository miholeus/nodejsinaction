var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('express-method-override');
var session = require('express-session');
var redis = require('redis');
var client = redis.createClient(6379, 'localhost');

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var api = require('./routes/api');
var messages = require('./lib/messages');
var userMiddleware = require('./lib/middleware/user');
var error = require('./lib/middleware/error');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 2628000000 },
    saveUninitialized: true,
    resave: true,
    store: new (require('express-sessions'))({
        storage: 'redis',
        instance: client, // optional
        host: 'localhost', // optional
        port: 6379, // optional
        collection: 'sessions', // optional
        expire: 86400 // optional
    })
}));
app.use(messages);
app.use(express.static(path.join(__dirname, 'public')));

app.use(userMiddleware);

app.use('/api', api);
app.use('/', routes);
app.use('/register', register);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(error.notfound);

// error handlers
app.use(error.error);

module.exports = app;
