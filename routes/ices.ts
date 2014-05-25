/// <reference path="../typings/tsd.d.ts" />
import express = require('express');

export function prepare(router: express.Router) {
    router.get('/:id', (req, res) => {
        console.log("hoge");
        res.send('ices' + req.params.id);
    });

    router.get('/new', (req, res) => {

    });

    router.post("", (req, res) => {
        var body = req.body;
        var task = body.task;
        console.log(task);
        res.send('ices' + req.params.id);
    });
}