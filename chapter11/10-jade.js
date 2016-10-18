var jade = require('jade');
var template = 'a(href = url)';
var context = {url: 'http://google.com'};
var fn = jade.compile(template);
console.log(fn(context));