var memdb = require('..');
var assert = require('assert');

describe('memdb', function(){
    beforeEach(function(done){
        // Очищаем базу данных перед выполнением каждого варианта теста,
        // чтобы тесты не зависели от состояния
        memdb.clear(function(){
            done();
        });
    });
    describe(".save(doc)", function(){
        it('should save the document', function(){
            var pet = {name: 'Tobi'};
            memdb.save(pet, function(){
                // выполняем обратный вызов с первым документом
                var ret = memdb.first({name: 'Tobi'});
                assert(ret == pet);
                // информируем Mocha о прохождении данного варианта теста
                done();
            });
        });
    });

    describe(".first(obj)", function(){
        // Первое ожидание для метода .first()
        it('should return the first matching doc', function(){
            var tobi = {name: 'Tobi'};
            var loki = {name: 'Loki'};

            // Сохраняем два документа
            memdb.save(tobi);
            memdb.save(loki);

            // Проверяем корректность каждого возвращаемого документа
            var ret = memdb.first({name: 'Tobi'});
            assert(ret == tobi);

            var ret = memdb.first({name: 'Loki'});
            assert(ret == loki);
        });
        // Второе ожидание для метода .first()
        it('should return null when no doc matches', function(){
            var ret = memdb.first({name: 'Manny'});
            assert(ret == null);
        });
    });
});