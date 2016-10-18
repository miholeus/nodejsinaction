var ejs = require('ejs');
var template = '<%=: name | capitalize %>';
var context = {name: 'bob'};
console.log(ejs.render(template, context));