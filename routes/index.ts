/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
import app = require('../my-app');
export module Config {
    export var router = new express.Router();
}

var router = Config.router;
var _ : UnderscoreStatic = require('underscore');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'ice.me' });
    app.myapp.dbManager.get("hoge", (err, redisRes) =>
    {
//       res.render('index', { title: redisRes});
    });
});