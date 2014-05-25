/// <reference path="../typings/tsd.d.ts" />
import express = require('express');
export function prepare(router: express.Router) {
    router.get('/', (req, res) => {
        res.render('users');
    });
}
