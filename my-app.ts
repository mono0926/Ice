/// <reference path="typings/tsd.d.ts" />
/// <reference path="typings/multer.d.ts" />
import express = require('express');
import fs = require("fs");
import path = require('path');
import redis = require('redis');
import bodyParser = require('body-parser');
import multer = require('multer');
import index = require('./routes/index');
import users = require('./routes/users');
import ices = require('./routes/ices');
import angular = require('./routes/angular');
import todos = require('./routes/todos');
import db_manager = require('./model/db-manager');
//import cookieParser = require('cookie-parser');
//import session = require('express-session');
//import RedisStore = require('connect-redis')(session);

export var app = express(),
    dbManager = db_manager.manager;

dbManager.set("hoge", process.env.ENV, (err, res) =>
{
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
app.use(multer({ dest: './uploads/'}))

setupRoutes();

function setupViewEngine() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(require('stylus').middleware({ src: path.join(__dirname, 'public') }));
}

function setupRoutes() {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

    index.prepare('/');
    users.prepare('/users');
    ices.prepare('/ices');
    angular.prepare('/angular');
    todos.prepare('/todos');
    todos.prepareAPI('/api');

    // TODO: デバッグ時のみにする
    app.use((req, res, next) => {
        var err = new Error('Not Found');
        next(err);
    });
}

