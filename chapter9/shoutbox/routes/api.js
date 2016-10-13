var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth');
var User = require('../lib/user');

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

module.exports = router;