/// <reference path="../typings/tsd.d.ts" />
var express = require('express'), router = express.Router();

router.get('/:id', function (req, res) {
    res.send('ices' + req.params.id);
});

module.exports = router;
//# sourceMappingURL=ices.js.map
