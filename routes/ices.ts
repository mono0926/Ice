/// <reference path="../typings/tsd.d.ts" />

import express = require('express');
var _router = new express.Router();
_router.get('/:id', (req, res) => {
    res.send('ices' + req.params.id);
});

export module Config {
    export var router = _router;
}