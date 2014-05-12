/// <reference path="typings/tsd.d.ts" />
var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var ices = require('./routes/ices');
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

var values = ["hoge", process.env.ENV];
dbManager.set(values, function (err, res) {
    console.log(err);
    console.log(res);
});

setupViewEngine();

//app.use(favicon());
//app.use(logger('dev'));
//app.use(cookieParser());
//// TODO: hogeじゃなくする
//app.use(cookieParser("hoge"));
//app.use(session({
//    secret: "hoge",
//    store: new RedisStore({client: redisClient})
//}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

setupRoutes();

//// TODO: デバッグ時のみにする
app.use(function (req, res, next) {
    var err = new Error('Not Found');

    //    err.status = 404;
    next(err);
});

function setupViewEngine() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));
}

function setupRoutes() {
    app.use('/', index.Config.router);
    app.use('/users', users.Config.router);
    app.use('/ices', ices.Config.router);
}
//# sourceMappingURL=my-app.js.map
