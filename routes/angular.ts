/// <reference path="../typings/tsd.d.ts" />
import app = require('../my-app');
import express = require('express');

export module Config {
    export var router = new express.Router();
}

var router = Config.router;

router.get('/', (req, res) => {
    res.render('angular');
});