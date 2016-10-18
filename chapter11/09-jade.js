var jade = require('jade');
var template = 'strong #{message}';
var context = {message: 'Hello template!'};

var fn = jade.compile(template);
console.log(fn(context));