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

User.getByName = function(name, fn) {
    User.getId(name, function(err, id){
        if (err) return fn(err);
        // Выборка сведений о пользователе по идентификатору
        User.get(id, fn);
    });
};

User.getId = function(name, fn) {
    // Получение идентификатора, индексированного по имени
    db.get('user:id:' + name, fn);
};

User.get = function(id, fn) {
    db.hgetall('user:' + id, function(err, user){
        if (err) return fn(err);
        // Преобразование объекта в новый объект User
        fn(null, new User(user));
    })
};

User.authenticate = function(name, pass, fn) {
    // Поиск пользователя по имени
    User.getByName(name, function(err, user){
        if (err) return fn(err);
        if (!user.id) return fn();
        // Хеширование данного пароля
        bcrypt.hash(pass, user.salt, function(err, hash){
            if (err) return fn(err);
            // Соответствие найдено
            if (hash == user.pass) return fn(null, user);
            // Пароль неверный
            fn();
        });
    });
};

User.prototype.toJSON = function(){
    return {
        id: this.id,
        name: this.name
    }
};

/*
var tobi = new User({
    name: 'Tobi',
    pass: '12345',
    age: '2'
});

tobi.save(function(err){
    if (err) throw err;
    console.log("user id %d", tobi.id);
});*/