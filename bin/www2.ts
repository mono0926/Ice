/// <reference path="../typings/tsd.d.ts" />
import myapp = require('../my-app');
import winston = require('winston');
var port = process.env.PORT || 5000;

winston.info(port);

var server = myapp.app.listen(port, () => {
    winston.info('Express server listening on port ' + server.address().port);
});