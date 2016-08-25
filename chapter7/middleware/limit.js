

module.exports = function limit(bytes){
    if ('string' == typeof bytes) bytes = utils.parseBytes(bytes);
    if ('number' != typeof bytes) throw new Error('limit() bytes required');

    if (process.env.NODE_ENV !== 'test') {
        console.warn('connect.limit() will be removed in connect 3.0');
    }

    return function limit(req, res, next){
        var received = 0
            , len = req.headers['content-length']
            ? parseInt(req.headers['content-length'], 10)
            : null;

        // self-awareness
        if (req._limit) return next();
        req._limit = true;

        // limit by content-length
        if (len && len > bytes) return next(utils.error(413));

        // limit
        if (brokenPause) {
            listen();
        } else {
            req.on('new Listener', function handler(event) {
                if (event !== 'data') return;

                req.removeListener('new Listener', handler);
                // Start listening at the end of the current loop
                // otherwise the request will be consumed too early.
                // Sideaffect is `limit` will miss the first chunk,
                // but that's not a big deal.
                // Unfortunately, the tests don't have large enough
                // request bodies to test this.
                process.nextTick(listen);
            });
        };

        next();

        function listen() {
            req.on('data', function(chunk) {
                received += Buffer.isBuffer(chunk)
                    ? chunk.length :
                    Buffer.byteLength(chunk);

                if (received > bytes) req.destroy();
            });
        };
    };
};