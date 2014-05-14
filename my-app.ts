/// <reference path="typings/tsd.d.ts" />
import express = require('express');
import fs = require("fs");
import path = require('path');
import redis = require('redis');
import bodyParser = require('body-parser');
import index = require('./routes/index');
import users = require('./routes/users');
import ices = require('./routes/ices');
import db_manager = require('./model/db-manager');
//import cookieParser = require('cookie-parser');
//import session = require('express-session');
//import RedisStore = require('connect-redis')(session);


export module myapp {
    export var app = express();
    export var dbManager = db_manager.db_manager.manager;
}

var app = myapp.app,
    dbManager = myapp.dbManager;

dbManager.set("hoge", process.env.ENV, (err, res) =>
{
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

function setupViewEngine() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));
}

function setupRoutes() {
    app.use('/', index.Config.router);
    app.use('/users', users.Config.router);
    app.use('/ices', ices.Config.router);
//// TODO: デバッグ時のみにする
    app.use((req, res, next) => {
        var err = new Error('Not Found');
//    err.status = 404;
        next(err);
    });
}

