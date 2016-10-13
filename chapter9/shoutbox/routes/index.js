var express = require('express');
var router = express.Router();
var User = require('../lib/user');
var Entry = require('../lib/entry');
var validate = require('../lib/middleware/validate');
var page = require('../lib/middleware/page');
var entryMiddleware = require('../lib/middleware/entry');

/* GET home page. */
router.get('/', page(Entry.count, 5), function (req, res, next) {
    var page = req.page;
    throw new Error("some error");
    Entry.getRange(page.from, page.to, function(err, entries){
        if (err) return next(err);
        res.render('index', {
            title: 'Entries',
            entries: entries
        });
    });
});

router.get('/post',function(req, res){
    res.render('post', {title: 'Post'});
});

router.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entryMiddleware);

router.get('/login', function (req, res, next){
    res.render('login', {title: 'Login'});
});
router.post('/login', function (req, res, next){
    var data = req.body.user;
    // Проверка полномочий
    User.authenticate(data.name, data.pass, function(err, user){
        // Делегирование ошибок
        if (err) return next(err);
        // Обслуживаем пользователя с правильными полномочиями
        if (user) {
            req.session.uid = user.id;
            // Перенаправление к полному списку
            res.redirect('/');
        } else {
            // Экспонирование сообщения об ошибке
            res.error('Sorry! Invalid credentials.');
            res.redirect('back');
        }
    })
});
router.get('/logout', function (req, res, next){
    req.session.destroy(function(err){
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;
