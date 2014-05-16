/// <reference path="typings/tsd.d.ts" />
var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var ices = require('./routes/ices');
var angular = require('./routes/angular');
var db_manager = require('./model/db-manager');

//import cookieParser = require('cookie-parser');
//import session = require('express-session');
//import RedisStore = require('connect-redis')(session);
(function (myapp) {
    myapp.app = express();
    myapp.dbManager = db_manager.db_manager.manager;
})(exports.myapp || (exports.myapp = {}));
var myapp = exports.myapp;

var app = myapp.app, dbManager = myapp.dbManager;

dbManager.set("hoge", process.env.ENV, function (err, res) {
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

setupRoutes();

function setupViewEngine() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));
}

function setupRoutes() {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
    app.use('/', index.Config.router);
    app.use('/users', users.Config.router);
    app.use('/ices', ices.Config.router);
    app.use('/angular', angular.Config.router);

    // TODO: デバッグ時のみにする
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        next(err);
    });
}
//# sourceMappingURL=my-app.js.map
