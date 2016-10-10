var User = require('../user');
module.exports = function(req, res, next) {
    // Получаем из сеанса идентификатор пользователя, вошедшего в систему
    var uid = req.session.uid;
    if (!uid) return next();
    // Получаем из Redis данные пользователя, вошедшего в систему
    User.get(uid, function(err, user){
        if (err) return next(err);
        // Экспонируем данные пользователя объекту ответа
        req.user = res.locals.user = user;
        next();
    });
};