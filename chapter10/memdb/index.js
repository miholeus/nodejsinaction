var db = [];

exports.save = function(doc, cb) {
    db.push(doc);
    if (cb) {
        setTimeout(function(){
            cb();
        }, 1000);
    }
};

exports.first = function(obj) {
    return db.filter(function(doc){
        for (var key in obj) {
            if (doc[key] != obj[key]) {
                return false;
            }
        }
        // Соответствие есть; возвращаем и выбираем документ
        return true;
        // нужен только первый документ или null
    }).shift();
};

exports.clear = function(cb) {
    db = [];
    if (cb) {
        cb();
    }
};