var redis = require('redis');
var bcrypt = require('bcrypt');
// Создание долговременного соединения с Redis
var db = redis.createClient();

module.exports = User;

function User(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

User.prototype.save = function(fn) {
    if (this.id) {
        this.update(fn);
    } else {
        var user = this;
        db.incr('user:ids', function(err, id){
            if (err) return fn(err);
            user.id = id;
            // Хеширование пароля
            user.hashPassword(function(err){
                if (err) return fn(err);
                user.update(fn);
            });
        });
    }
};

User.prototype.update = function(fn) {
    var user = this;
    var id = user.id;
    // Индексирование идентификатора пользователя по имени
    db.set('user:id:' + user.name, id, function(err){
        if (err) return fn(err);
        // Использование хеша в Redis для хранения данных
        db.hmset('user:' + id, user, function(err){
            console.log(err);
            fn(err);
        })
    })
};

User.prototype.hashPassword = function(fn) {
    var user = this;
    // Генерируем 12-символьную соль
    bcrypt.genSalt(12, function(err, salt){
        if (err) return fn(err);
        // Задаем соль для сохранения
        user.salt = salt;
        // Генерируем хеш
        bcrypt.hash(user.pass, salt, function(err, hash){
            if (err) return fn(err);
            // Задаем хеш для сохранения
            user.pass = hash;
            fn();
        });
    });
};

var tobi = new User({
    name: 'Tobi',
    pass: '12345',
    age: '2'
});

tobi.save(function(err){
    if (err) throw err;
    console.log("user id %d", tobi.id);
});