var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth');
var User = require('../lib/user');
var entryMiddleware = require('../lib/middleware/entry');
var userMiddleware = require('../lib/middleware/user');
var Entry = require('../lib/entry');
var page = require('../lib/middleware/page');

exports.auth = function(req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    User.authenticate(user.name, user.pass, function(err, user){
        if (err) return next(err);
        if (user) {
            req.session.uid = user.id;
            next();
        } else {
            return unauthorized(res);
        }
    });
};

exports.user = function(req, res, next) {
    User.get(req.params.id, function(err, user){
        if (err) return next(err);
        if (!user.id) return res.send(404);
        res.json(user);
    });
};

router.get('/user/:id', this.auth, this.user);

router.post('/entry', this.auth, userMiddleware, entryMiddleware);

router.get('/entries', page(Entry.count), function(req, res, next){
    var page = req.page;
    Entry.getRange(page.from, page.to, function(err, entries){
        if (err) return next(err);
        res.format({
            'application/json': function(){
                // JSON-ответ
                res.send(entries);
            },
            'application/xml': function(){
                // XML-ответ
                res.write('<entries>\n');
                entries.forEach(function(entry){
                    res.write("<entry>\n");
                    res.write("<title>" + entry.title + "</title>\n");
                    res.write("<body>" + entry.body + "</body>\n");
                    res.write("<username>" + entry.username + "</username>\n");
                    res.write("</entry>\n");
                });
                res.end('</entries>\n');
            }
        });
    });
});

module.exports = router;