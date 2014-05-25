/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />
var app = require('../my-app');
var express = require('express');


function prepare(path) {
    var router = new express.Router();
    app.app.use(path, router);
    router.get('/', function (req, res) {
        res.render('todo');
    });
}
exports.prepare = prepare;

function prepareAPI(path) {
    var router = new express.Router();
    app.app.use(path, router);
    router.get("/todos", getList);
    router.post("/todos", insert);
    router.put("/todos", update);
    router.delete("/todos", deleteDoneItems);
}
exports.prepareAPI = prepareAPI;

// これ以降はAPIの実装
function getList(req, res) {
    getAll(function (todos) {
        res.json(todos);
    });
    /*
    app.dbManager.client.lrange(["todoList", 0, -1], (error, redisRes) =>
    {
    console.log(error);
    console.log(redisRes);
    var todos = []
    for (var i = 0; i< redisRes.length; i++) {
    var a = redisRes[i];
    console.log(a);
    console.log(typeof a);
    todos.push(JSON.parse(a));
    }
    res.json(todos);
    });
    */
}

function getAll(callback) {
    app.dbManager.client.smembers("todoList", function (error, ids) {
        console.log(error);
        console.log(ids);
        if (ids === undefined) {
            callback([]);
        }
        var multi = app.dbManager.client.multi();
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            multi.hget("todo:" + id, 'text');
            multi.hget("todo:" + id, 'done');
        }
        multi.exec(function (error, redisRes) {
            var todos = [];
            var dones = [];
            for (var i = 0; i < ids.length; i++) {
                var done = redisRes[i * 2 + 1] == 'true';
                todos.push({ id: ids[i], text: redisRes[i * 2], done: done });
                if (done) {
                    dones.push(ids[i]);
                }
            }
            console.log(error);
            console.log(redisRes);
            console.log('todos', todos);
            console.log('dones', dones);
            multi = app.dbManager.client.multi();
            multi.del("doneTodos");
            for (var i = 0; i < dones.length; i++) {
                multi.sadd("doneTodos", dones[i]);
            }
            multi.exec(function (err, r) {
                console.log("doneTodos", r);
                callback(todos);
            });
        });
    });
}

function insert(req, res) {
    app.dbManager.client.incr(["global:nextTodoId"], function (err, incrRes) {
        var todo = {
            id: incrRes,
            text: req.body.text,
            done: false
        };
        console.log(todo);
        var todoJSON = JSON.stringify(todo);
        console.log(todoJSON);
        var multi = app.dbManager.client.multi();
        multi.sadd(["todoList", incrRes]);
        multi.hmset([
            "todo:" + incrRes, {
                'text': req.body.text,
                'done': false
            }]);
        multi.exec(function (error, redisRes) {
            console.log(error);
            res.json(todo);
        });
    });
    /*
    app.dbManager.client.incr(["global:nextTodoId"], (err, incrRes) =>
    {
    var todo: ITodo = {
    id:incrRes,
    text: req.body.text,
    done: false
    };
    console.log(todo);
    var todoJSON = JSON.stringify(todo);
    console.log(todoJSON);
    app.dbManager.client.lpush(["todoList", todoJSON], (error, redisRes) =>
    {
    console.log(error);
    res.json(todo);
    });
    });
    */
}

function update(req, res) {
    app.dbManager.client.hget("todo:" + req.body.id, 'done', function (err, done) {
        console.log('done', done);
        app.dbManager.client.hset("todo:" + req.body.id, 'done', done !== 'true', function (err, result) {
            console.log('result', result);
            getAll(function (todos) {
                res.json(todos);
            });
        });
    });
}

function deleteDoneItems(req, res) {
    app.dbManager.client.smembers("doneTodos", function (e, doneIds) {
        console.log(doneIds);
        var multi = app.dbManager.client.multi();
        for (var i = 0; i < doneIds.length; i++) {
            multi.del("doneTodos");
            multi.srem("todoList", doneIds[i]);
        }
        multi.exec(function (e, r) {
            console.log(r);
            getAll(function (todos) {
                res.json(todos);
            });
        });
    });
}
//# sourceMappingURL=todos.js.map
