/// <reference path="../typings/tsd.d.ts" />
import winston = require('winston');
import redis = require('redis');

export module db_manager {

    export interface IDBManager {
        set(key: string, value: string, callback?: redis.StringCallback): void;
        get(key: string, callback?: redis.StringCallback): void;
    }

    class RedigMnager implements IDBManager {
        private client : redis.RedisClient;
        constructor() {
            var env = process.env;
            winston.info('ENV: ' + env.ENV);
            if (env.ENV === "debug") {
                this.client = redis.createClient(6379, "localhost", null);
            } else {
                var rtg   = require("url").parse(process.env.REDISTOGO_URL);
                var rediOps : redis.ClientOpts = {parser: "javascript", no_ready_check : false};
                this.client = redis.createClient(rtg.port, rtg.hostname, rediOps);
                this.client.auth(env.REDIS_PASSWORD, (err, res) =>
                {
                    winston.info(res);
                    winston.info(err.toString());
                });
            }
        }


        set(key: string, value: string, callback?: redis.StringCallback): void {
            this.client.set(key, value, callback);
        }
        get(key: string, callback?: redis.StringCallback): void {
            this.client.get(key, callback);
        }


        get getClient() {
            return this.client;
        }
    }

    export var manager : IDBManager = new RedigMnager();
}