/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var app = require('../my-app');
var _ = require('underscore');

function prepare(path) {
    var router = new express.Router();
    app.app.use(path, router);

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', { title: 'ice.me' });
        app.dbManager.get("hoge", function (err, redisRes) {
            //       res.render('index', { title: redisRes});
        });
    });
}
exports.prepare = prepare;
//# sourceMappingURL=index.js.map
