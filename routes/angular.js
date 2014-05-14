var express = require('express');

(function (Config) {
    Config.router = new express.Router();
})(exports.Config || (exports.Config = {}));
var Config = exports.Config;

var router = Config.router;

router.get('/', function (req, res) {
    res.render('angular');
});
//# sourceMappingURL=angular.js.map
