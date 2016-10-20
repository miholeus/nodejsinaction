process.on('uncaughtException', function(err){
    console.error('got uncaught exception:', err.message);
    process.exit(1);
});

throw new Error('an uncaught exception');