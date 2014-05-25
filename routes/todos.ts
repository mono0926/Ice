/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/sequelize/sequelize.d.ts" />
import app = require('../my-app');
import express = require('express');
//import Sequelize = require("sequelize");

// sequelizeのためのインタフェースの作成
interface ITodo {
    id?: number;
    text: string;
    done: boolean;
}

export function prepare(router: express.Router) {
    router.get('/', (req, res) => {
        res.render('todo');
    });
}

export function prepareAPI(router: express.Router) {
    router.get("/todos", getList);
    router.post("/todos", insert);
    router.put("/todos", update);
    router.delete("/todos", deleteDoneItems);
}

// これ以降はAPIの実装
function getList(req: express.Request, res: express.Response) {
    getAll(todos => {
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

function getAll(callback:Function) {
    app.dbManager.client.smembers("todoList", (error, ids) =>
    {
        console.log(error);
        console.log(ids);
        if (ids === undefined) {
            callback([]);
        }
        var multi = app.dbManager.client.multi();
        for (var i = 0; i <ids.length; i++) {
            var id = ids[i];
            multi.hget("todo:" + id, 'text');
            multi.hget("todo:" + id, 'done');
        }
        multi.exec((error, redisRes) => {
            var todos :ITodo[] = [];
            var dones = [];
            for (var i = 0; i <ids.length; i++) {
                var done = redisRes[i*2+1] == 'true'
                todos.push({id: ids[i], text: redisRes[i*2], done: done});
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
            multi.exec((err, r) => {
                console.log("doneTodos", r);
                callback(todos);
            });
        });
    });
}

function insert(req: express.Request, res: express.Response) {
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
        var multi = app.dbManager.client.multi();
        multi.sadd(["todoList", incrRes]);
        multi.hmset(["todo:" + incrRes, {
            'text': req.body.text,
            'done': false
        }]);
        multi.exec((error, redisRes) =>
        {
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

function update(req: express.Request, res: express.Response) {
    app.dbManager.client.hget("todo:" + req.body.id, 'done', (err, done) => {
        console.log('done', done);
        app.dbManager.client.hset("todo:" + req.body.id, 'done', done !== 'true', (err, result) => {
            console.log('result', result);
            getAll(todos => {
                res.json(todos);
            });
        });
    });
}

function deleteDoneItems(req: express.Request, res: express.Response) {
    app.dbManager.client.smembers("doneTodos", (e, doneIds) => {
        console.log(doneIds);
        var multi = app.dbManager.client.multi();
        for (var i = 0; i < doneIds.length; i++) {
            multi.del("doneTodos");
            multi.srem("todoList", doneIds[i]);
        }
        multi.exec((e, r) => {
            console.log(r);
            getAll(todos => {
               res.json(todos);
            });
        });
    });
}