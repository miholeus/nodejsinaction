function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var events = require('events'),
    util = require('util');
util.inherits(Watcher, events.EventEmitter);

var fs = require('fs'),
    watchDir = './watch',
    processedDir = './done';

// Расширение возможностей класса EventEmitter путем добавления метода обработки файлов
Watcher.prototype.watch = function(){
    // Сохранение ссылки на объект Watcher, используемой при обратном вызове readdir
    var watcher = this;
    fs.readdir(this.watchDir, function(err, files){
        if (err) throw err;
        for (var index in files) {
            // Обработка каждого файла в выбранной папке
            watcher.emit('process', files[index]);
        }
    });
};
// Расширение класса EventEmitter путем добавления метода start, инициирующего просмотр
Watcher.prototype.start = function(){
    var watcher = this;
    fs.watchFile(watchDir, function(){
        watcher.watch();
    });
};

var watcher = new Watcher(watchDir, processedDir);
watcher.on('process', function process(file){
    if (file == '.gitkeep') return;// не обрабатываем .gitkeep файлы
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, function(err){
        if (err) throw err;
    });
});

watcher.start();