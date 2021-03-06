/// <reference path="../typings/tsd.d.ts" />
var winston = require('winston');
var redis = require('redis');

var RedigMnager = (function () {
    function RedigMnager() {
        var env = process.env;
        winston.info('env: ' + env);
        winston.info('ENV: ' + env.ENV);
        if (env.ENV === "debug") {
            this.client = redis.createClient(6379, "localhost", null);
        } else {
            winston.info('REDISTOGO_URL: ' + env.REDISTOGO_URL);
            var rtg = require("url").parse(env.REDISTOGO_URL);
            var redisOps = { parser: "javascript", no_ready_check: false };
            this.client = redis.createClient(rtg.port, rtg.hostname, redisOps);
            this.client.auth(env.REDIS_PASSWORD, function (err, res) {
                winston.info(res);
                if (err) {
                    winston.info(err.toString());
                }
            });
        }
    }
    RedigMnager.prototype.set = function (key, value, callback) {
        this.client.set(key, value, callback);
    };
    RedigMnager.prototype.get = function (key, callback) {
        this.client.get(key, callback);
    };

    Object.defineProperty(RedigMnager.prototype, "getClient", {
        get: function () {
            return this.client;
        },
        enumerable: true,
        configurable: true
    });
    return RedigMnager;
})();

exports.manager = new RedigMnager();
//# sourceMappingURL=db-manager.js.map
