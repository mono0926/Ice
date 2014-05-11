/// <reference path="../typings/tsd.d.ts" />
var express = require('express');
var _router = new express.Router();
_router.get('/:id', function (req, res) {
    res.send('ices' + req.params.id);
});

(function (Config) {
    Config.router = _router;
})(exports.Config || (exports.Config = {}));
var Config = exports.Config;
//# sourceMappingURL=ices.js.map
