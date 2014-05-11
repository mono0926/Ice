/// <reference path="../typings/tsd.d.ts" />
var app = require('../app');
var winston = require('winston');
var port = process.env.PORT || 5000;

winston.info(port);

var server = app.MyApp.app.listen(port, function () {
    winston.info('Express server listening on port ' + server.address().port);
});
//# sourceMappingURL=www2.js.map
