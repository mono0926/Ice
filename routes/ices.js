var express = require('express');

(function (Config) {
    Config.router = new express.Router();
})(exports.Config || (exports.Config = {}));
var Config = exports.Config;

var router = Config.router;

router.get('/:id', function (req, res) {
    console.log("hoge");
    res.send('ices' + req.params.id);
});

router.get('/new', function (req, res) {
});

router.post("", function (req, res) {
    var body = req.body;
    var task = body.task;
    console.log(task);
    res.send('ices' + req.params.id);
});
//# sourceMappingURL=ices.js.map
