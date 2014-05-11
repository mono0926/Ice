/// <reference path="../typings/tsd.d.ts" />
var
    express = require('express'),
    router = express.Router();

router.get('/:id', (req, res) => {
    res.send('ices' + req.params.id);
});

module.exports = router;