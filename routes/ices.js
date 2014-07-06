/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var app = require('../my-app');

function prepare(path) {
    var router = new express.Router();
    app.app.use(path, router);
    router.get('/:id', function (req, res) {
        console.log("hoge");
        res.send('ices' + req.params.id);
    });

    router.get('/new', function (req, res) {
    });

    router.post("", function (req, res) {
        var files = req.files;
        var body = req.body;
        var task = body.task;
        console.log(task);
        res.send('ices' + task);
    });
}
exports.prepare = prepare;
//# sourceMappingURL=ices.js.map
