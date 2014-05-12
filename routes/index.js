/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var app = require('../my-app');
(function (Config) {
    Config.router = new express.Router();
})(exports.Config || (exports.Config = {}));
var Config = exports.Config;

var router = Config.router;
var _ = require('underscore');

/* GET home page. */
router.get('/', function (req, res) {
    //    res.render('index', { title: 'ice.me' });
    app.myapp.dbManager.get("hoge", function (err, redisRes) {
        res.render('index', { title: redisRes });
    });
});
//# sourceMappingURL=index.js.map
