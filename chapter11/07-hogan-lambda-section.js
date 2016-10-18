var hogan = require('hogan.js');
var md = require('github-flavored-markdown');
var context = {
    name: 'Rick LaRue',
    markdown: function() {
        return function(text){
            // Контекст шаблона включает лямбда-секцию, выполняющую
            // синтаксический разбор Markdown-формата в шаблон
            return md.parse(text);
        }
    }
};

var template = '{{#markdown}}' +
    '**Name**:{{name}}' +
    '{{/markdown}}';

var template = hogan.compile(template);
console.log(template.render(context));