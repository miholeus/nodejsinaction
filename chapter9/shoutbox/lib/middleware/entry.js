var Entry = require('../entry');

module.exports = function(req, res, next){
    console.dir(req.body);
    var data = req.body.entry;
    var requestType = req.get('Content-Type');

    var entry = new Entry({
        "username": res.locals.user.name,
        "title": data.title,
        "body": data.body
    });

    entry.save(function(err){
        if (err) return next(err);
        if (requestType == 'application/json') {
            res.json({message: 'Entry added'});
        } else {
            res.redirect('/')
        }
    });
};