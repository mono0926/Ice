/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
import app = require('../my-app');

export function prepare(path: string) {
    var router = new express.Router();
    app.app.use(path, router);
    router.get('/:id', (req, res) => {
        console.log("hoge");
        res.send('ices' + req.params.id);
    });

    router.get('/new', (req, res) => {

    });

    router.post("", (req, res) => {
        var files = req.files
        var body = req.body;
        var task = body.task;
        console.log(task);
        res.send('ices' + task);
    });
}