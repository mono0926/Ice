/// <reference path="typings/tsd.d.ts" />
var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var ices = require('./routes/ices');
var angular = require('./routes/angular');
var todos = require('./routes/todos');
var db_manager = require('./model/db-manager');

//import cookieParser = require('cookie-parser');
//import session = require('express-session');
//import RedisStore = require('connect-redis')(session);
exports.app = express(), exports.dbManager = db_manager.manager;

exports.dbManager.set("hoge", process.env.ENV, function (err, res) {
    console.log(err);
    console.log(res);
});

//app.use(favicon());
//app.use(logger('dev'));
//app.use(cookieParser());
//// TODO: hogeじゃなくする
//app.use(cookieParser("hoge"));
//app.use(session({
//    secret: "hoge",
//    store: new RedisStore({client: redisClient})
//}));
setupViewEngine();
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded());

setupRoutes();

function setupViewEngine() {
    exports.app.set('views', path.join(__dirname, 'views'));
    exports.app.set('view engine', 'jade');
    exports.app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));
}

function setupRoutes() {
    exports.app.use(express.static(path.join(__dirname, 'public')));
    exports.app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

    var router = new express.Router();
    index.prepare(router);
    exports.app.use('/', router);

    router = new express.Router();
    users.prepare(router);
    exports.app.use('/users', router);

    router = new express.Router();
    ices.prepare(router);
    exports.app.use('/ices', router);

    router = new express.Router();
    angular.prepare(router);
    exports.app.use('/angular', router);

    router = new express.Router();
    todos.prepare(router);
    exports.app.use('/todos', router);

    router = new express.Router();
    todos.prepareAPI(router);
    exports.app.use('/api', router);

    // TODO: デバッグ時のみにする
    exports.app.use(function (req, res, next) {
        var err = new Error('Not Found');
        next(err);
    });
}
//# sourceMappingURL=my-app.js.map
