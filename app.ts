/// <reference path="typings/tsd.d.ts" />
import express = require('express');
import fs = require("fs");
import path = require('path');
import redis = require('redis');
import bodyParser = require('body-parser');
import index = require('./routes/index');
import users = require('./routes/users');
import ices = require('./routes/ices');
//import cookieParser = require('cookie-parser');
//import session = require('express-session');
//import RedisStore = require('connect-redis')(session);


export module MyApp {
    var rediOps : redis.ClientOpts = {parser: "javascript", no_ready_check : false};
    var client = null;

    if (process.env.ENV === "debug") {
        console.log("debug");

        client = redis.createClient(6379, "localhost", rediOps);
    } else {
        console.log("production");

        client = redis.createClient(9242, "angelfish.redistogo.com", rediOps);
        console.log("hogehoge");
        client.auth("a77d8bad8279ef1fa18f15cb209bf43d", (err, res) =>
        {
            console.log("connected");
            console.log(err);
            console.log("connected");
        });
    }

    export var app = express();
    export var redisClient = client;
}

var app = MyApp.app,
    redisClient = MyApp.redisClient;

var values = ["hoge", process.env.ENV];
redisClient.set(values, (err, res) =>
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


//// TODO: デバッグ時のみにする
app.use((req, res, next) => {
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

