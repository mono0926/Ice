/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var app = require('../my-app');
function prepare(path) {
    var router = new express.Router();
    app.app.use(path, router);
    router.get('/', function (req, res) {
        res.render('users');
    });
}
exports.prepare = prepare;
//# sourceMappingURL=users.js.map
