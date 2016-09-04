var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var join = path.join;
var formidable = require('formidable');

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}

var Photo = require('../models/Photo');

router.get('/', function(req, res, next){
    Photo.find({}, function (err, photos){
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        })
    });
});

router.get('/upload', function(req, res){
    res.render('photos/upload', {
        title: 'Photo upload'
    })
});

router.post('/upload', function(req, res, next){
    var dir = req.app.get('photos');

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    if(!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad request: expecting multipart/form-data');
        return;
    }
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files){
        // По умолчанию исходное имя файла
        var img = files['photo[image]'];
        var name = fields['photo[name]'] || img.name;
        var path = join(dir, img.name);
        // Переименование файла
        fs.rename(img.path, path, function(err){
            if (err) return next(err);
            Photo.create({
                name: name,
                path: img.name
            }, function(err){
                // Делегируем ошибки
                if (err) return next(err);
                res.redirect('/');
            });
        });
    });
});

module.exports = router;