var express = require('express');
var router = express.Router();
var User = require('../lib/user');

router.get('/', function(req, res){
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next){
    var data = req.body.user;
    User.getByName(data.name, function(err, user){
        if (err) return next(err);
        // Это имя пользователя уже занято
        if (user.id) {
            res.error('Username already taken!');
            res.redirect('back');
        } else {
            // Создание пользователя с помощью переданных данных
            user = new User({
                name: data.name,
                pass: data.pass
            });
        }
        console.log(user);
        // Сохранение нового пользователя
        user.save(function(err){
            if (err) return next(err);
            // Сохранение идентификатора пользователя для аутентификации
            req.session.uid = user.id;
            // Перенаправление на страницу списка
            res.redirect('/');
        });
    })
});

module.exports = router;