/// <reference path="../typings/tsd.d.ts" />
import winston = require('winston');
import redis = require('redis');

export interface IDBManager {
    set(key: string, value: string, callback?: Function): void;
    get(key: string, callback?: Function): void;
    client : redis.RedisClient;
}

class RedigMnager implements IDBManager {
    client : redis.RedisClient;
    constructor() {
        var env = process.env;
        winston.info('env: ' + env);
        winston.info('ENV: ' + env.ENV);
        if (env.ENV === "debug") {
            this.client = redis.createClient(6379, "localhost", null);
        } else {
            winston.info('REDISTOGO_URL: ' + env.REDISTOGO_URL);
            var rtg   = require("url").parse(env.REDISTOGO_URL);
            var redisOps : redis.RedisOptions = {parser: "javascript", no_ready_check : false};
            this.client = redis.createClient(rtg.port, rtg.hostname, redisOps);
            this.client.auth(env.REDIS_PASSWORD, (err, res) =>
            {
                winston.info(res);
                if (err) {
                    winston.info(err.toString());
                }
            });
        }
    }


    set(key: string, value: string, callback?: Function): void {
        this.client.set(key, value, callback);
    }
    get(key: string, callback?: Function): void {
        this.client.get(key, callback);
    }


    get getClient() {
        return this.client;
    }
}

export var manager : IDBManager = new RedigMnager();