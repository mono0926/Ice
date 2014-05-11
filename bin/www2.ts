/// <reference path="../typings/tsd.d.ts" />
import app = require('../app');
import winston = require('winston');
var port = process.env.PORT || 5000;

winston.info(port);

var server = app.MyApp.app.listen(port, () => {
    winston.info('Express server listening on port ' + server.address().port);
});