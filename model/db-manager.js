/// <reference path="../typings/tsd.d.ts" />
var winston = require('winston');
var redis = require('redis');

(function (db_manager) {
    var RedigMnager = (function () {
        function RedigMnager() {
            var env = process.env;
            winston.info(env.ENV);
            if (env.ENV === "debug") {
                this.client = redis.createClient(6379, "localhost", null);
            } else {
                winston.info("production");
                var rediOps = { parser: "javascript", no_ready_check: false };
                this.client = redis.createClient(env.REDIS_PORT, env.REDIS_URL, rediOps);
                this.client.auth(env.REDIS_PASSWORD, function (err, res) {
                    winston.info(res);
                    winston.info(err.toString());
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

    db_manager.manager = new RedigMnager();
})(exports.db_manager || (exports.db_manager = {}));
var db_manager = exports.db_manager;
//# sourceMappingURL=db-manager.js.map
