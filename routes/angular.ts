/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
import app = require('../my-app');
export function prepare(path: string) {
    var router = new express.Router();
    app.app.use(path, router);
    router.get('/', (req, res) => {
        res.render('angular');
    });
}
