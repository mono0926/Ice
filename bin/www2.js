/// <reference path="../typings/tsd.d.ts" />
var winston = require('winston');
var MyApp = require('../app');

var myApp = new MyApp();
var port = process.env.PORT || 5000;

winston.info(port);

var server = myApp.app.listen(port, function () {
    winston.info('Express server listening on port ' + server.address().port);
});
//# sourceMappingURL=www2.js.map
