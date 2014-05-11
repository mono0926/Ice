/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
var _ : UnderscoreStatic = require('underscore');
var _router = new express.Router();

/* GET home page. */
_router.get('/', (req, res) => {
    res.render('index', { title: 'ice.me' });
});

export module Config {
    export var router = _router;
}