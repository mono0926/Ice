/// <reference path="../typings/tsd.d.ts" />
var express = require('express'), router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'ice.me' });
});

module.exports = router;
//# sourceMappingURL=index.js.map
