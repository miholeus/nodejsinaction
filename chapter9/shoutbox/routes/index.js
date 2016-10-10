var express = require('express');
var router = express.Router();
var User = require('../lib/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

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
