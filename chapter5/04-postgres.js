var pg = require('pg');

var conString = "tcp://test:test@localhost:5432/test";

var client = new pg.Client(conString);
client.connect();