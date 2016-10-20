setInterval(function(){
    var d = new Date().toUTCString();
    console.log(d);
}, 1000);

process.on('exit', function(){
    console.log('exiting');
});