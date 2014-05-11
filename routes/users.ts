/// <reference path="../typings/tsd.d.ts" />

import express = require('express');
var _router = new express.Router();
_router.get('/', (req, res) => {
    res.send('respond with a resource');
});

export module Config {
    export var router = _router;
}