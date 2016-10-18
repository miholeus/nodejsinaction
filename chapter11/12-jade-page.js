var jade = require('jade');
var fs = require('fs');

var templateFile = './template/page.jade';
var iterTemplate = fs.readFileSync(templateFile);
var context = {messages: [
    'You have logged in successfully.',
    'Welcome back!'
]};

var fn = jade.compile(iterTemplate, {filename: templateFile});
console.log(fn(context));