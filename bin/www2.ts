/// <reference path="../typings/tsd.d.ts" />
import winston = require('winston');
import MyApp = require('../app');

var myApp = new MyApp();
var port = process.env.PORT || 5000;

winston.info(port);

var server = myApp.app.listen(port, () => {
    winston.info('Express server listening on port ' + server.address().port);
});