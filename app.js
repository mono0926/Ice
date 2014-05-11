/// <reference path="typings/tsd.d.ts" />
var express = require('express');

var path = require('path');
var redis = require('redis');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var ices = require('./routes/ices');

//import cookieParser = require('cookie-parser');
//import session = require('express-session');
//import RedisStore = require('connect-redis')(session);
(function (MyApp) {
    var rediOps;

    MyApp.app = express();
    MyApp.redisClient = redis.createClient(6379, "localhost", rediOps);
})(exports.MyApp || (exports.MyApp = {}));
var MyApp = exports.MyApp;

var app = MyApp.app, redisClient = MyApp.redisClient;

var values = ["hoge", "fuga"];
redisClient.set(values, function (err, res) {
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
//# sourceMappingURL=app.js.map
