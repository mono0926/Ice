const
    express = require("express"),
    logfmt = require("logfmt"),
    fs = require("fs"),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    users = require('./routes/users'),
    ices = require('./routes/ices'),
    session = require('express-session'),
    redisClient = require('redis').createClient()
    RedisStore = require('connect-redis')(session),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// TODO: hogeじゃなくする
app.use(cookieParser("hoge"));
app.use(session({
    secret: "hoge",
    store: new RedisStore({client: redisClient})
}));

app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));

app.use('/', routes);
app.use('/users', users);
app.use('/ices', ices);

// TODO: デバッグ時のみにする
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.redisClient = redisClient;

module.exports = app;
