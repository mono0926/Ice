/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
import app = require('../my-app');
var _ : UnderscoreStatic = require('underscore');

export function prepare(path: string) {
    var router = new express.Router();
    app.app.use(path, router);
    /* GET home page. */
    router.get('/', (req, res) => {
        res.render('index', { title: 'ice.me' });
        app.dbManager.get("hoge", (err, redisRes) =>
        {
//       res.render('index', { title: redisRes});
        });
    });
}