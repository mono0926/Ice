/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var _router = new express.Router();
_router.get('/', function (req, res) {
    res.send('respond with a resource');
});

(function (Config) {
    Config.router = _router;
})(exports.Config || (exports.Config = {}));
var Config = exports.Config;
//# sourceMappingURL=users.js.map
