var vows = require('vows');
var assert = require('assert');
var Todo = require('./Todo');

// Пакет
vows.describe('Todo').addBatch({
    // Контекст
    'when adding an item': {
        // Раздел
        topic: function(){
            var todo = new Todo();
            todo.add('Feed my cat');
            return todo;
        },
        // Обязательство
        'it should exist in my todos': function(err, todo){
            assert.equal(todo.getCount(), 1);
        }
    }
}).run();