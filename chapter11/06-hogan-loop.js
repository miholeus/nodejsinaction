var hogan = require('hogan.js');
var context = {
    students: [
        {name: 'Jane Narwhal', age: 21},
        {name: 'Rick LaRue', age: 26}
    ]
};

var template = '{{#students}}' +
    '<p>Name:{{name}}, Age: {{age}} years old</p>' +
    '{{/students}}';

var template = hogan.compile(template);
console.log(template.render(context));