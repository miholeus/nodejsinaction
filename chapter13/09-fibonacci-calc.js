function fib(n) {
    if (n < 2) {
        return 1;
    }
    return fib(n-2) + fib(n-1);
}

var result;
process.on('message', (m) => {
    var input = parseInt(m.number, 10);
    if (isNaN(input)) {
        result = 'NaN';
    } else {
        result = fib(input);
        process.send({result:result});
    }
});