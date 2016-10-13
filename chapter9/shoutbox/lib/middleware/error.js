exports.notfound = function (req, res) {
    res.status(404).format({
        html: function () {
            res.render('404');
        },
        json: function () {
            res.send({message: 'Resource not found'});
        },
        xml: function () {
            res.write('<error>\n');
            res.write(' <message>Resource not found</message>\n');
            res.end('</error>\n');
        },
        text: function () {
            res.send('Resource not found\n');
        }
    });
};

// Обработчики ошибок должны принимать четыре аргумента
exports.error = function(err, req, res, next){
    // Запись ошибки в поток stderr console.error(err.stack);
    var msg;
    // Примеры ошибок специального вида
    if (req.app.get('env') === 'development') {
        msg = err.message;
        res.statusCode = 500;
    } else {
        switch (err.type) {
            case 'database':
                msg = 'Server Unavailable';
                res.statusCode = 503;
                break;
            default:
                msg = 'Internal Server Error';
                res.statusCode = 500;
        }
    }

    res.format({
        // Визулизация шаблона, если принимается формат HTML
        html: function(){
            res.render('5xx', { msg: msg, status: res.statusCode });
        },
        // JSON-ответ, если принимается формат JSON
        json: function(){
            res.send({ error: msg });
        },
        // Ответ в формате простого текста
        text: function(){
            res.send(msg + '\n'); }
    });
};