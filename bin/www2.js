/// <reference path="../typings/tsd.d.ts" />
var debug = require('debug')('my-application'), app = require('../app');

app.port = process.env.PORT || 5000;

debug(app.port);

var server = app.listen(app.port, function () {
    debug('Express server listening on port ' + server.address().port);
});
//# sourceMappingURL=www2.js.map
