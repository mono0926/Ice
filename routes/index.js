/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var _ = require('underscore');
var _router = new express.Router();

/* GET home page. */
_router.get('/', function (req, res) {
    res.render('index', { title: 'ice.me' });
});

(function (Config) {
    Config.router = _router;
})(exports.Config || (exports.Config = {}));
var Config = exports.Config;
//# sourceMappingURL=index.js.map
