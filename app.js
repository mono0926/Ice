/// <reference path="typings/tsd.d.ts" />
var express = require('express');

var path = require('path');

var indexPath = path.join(__dirname, 'routes/index');
console.log(indexPath);
var index = require('./routes/index');
var users = require('./routes/users');
var ices = require('./routes/ices');

//import cookieParser = require('cookie-parser');
//import bodyParser = require('body-parser');
//import session = require('express-session');
//import RedisStore = require('connect-redis')(session);
var _app = express();

//        var redisClient = redis.createClient(6379, 'localhost');
// view engine setup
_app.set('views', path.join(__dirname, 'views'));
_app.set('view engine', 'jade');

//app.use(favicon());
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
_app.use(express.static(path.join(__dirname, 'public')));

//// TODO: hogeじゃなくする
//app.use(cookieParser("hoge"));
//app.use(session({
//    secret: "hoge",
//    store: new RedisStore({client: redisClient})
//}));
_app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));

_app.use('/', index.Config.router);
_app.use('/users', users.Config.router);
_app.use('/ices', ices.Config.router);

//
//// TODO: デバッグ時のみにする
/// catch 404 and forwarding to error handler
_app.use(function (req, res, next) {
    var err = new Error('Not Found');

    //    err.status = 404;
    next(err);
});

var MyApp = (function () {
    function MyApp() {
    }
    Object.defineProperty(MyApp.prototype, "app", {
        get: function () {
            return _app;
        },
        enumerable: true,
        configurable: true
    });
    return MyApp;
})();
module.exports = MyApp;
//# sourceMappingURL=app.js.map
