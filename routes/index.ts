/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
import app = require('../my-app');
var _ : UnderscoreStatic = require('underscore');

export function prepare(router: express.Router) {
    /* GET home page. */
    router.get('/', (req, res) => {
        res.render('index', { title: 'ice.me' });
        app.dbManager.get("hoge", (err, redisRes) =>
        {
//       res.render('index', { title: redisRes});
        });
    });
}