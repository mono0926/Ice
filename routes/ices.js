function prepare(router) {
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
}
exports.prepare = prepare;
//# sourceMappingURL=ices.js.map
