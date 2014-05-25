/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./todo-model.ts" />
var TodoApp;
(function (TodoApp) {
    var Service = (function () {
        function Service($http) {
            this.$http = $http;
            this.todoList = [
                {
                    id: 1,
                    text: "牛乳を買う",
                    done: true
                },
                {
                    id: 2,
                    text: "原稿を書く",
                    done: false
                }
            ];
        }
        /** 管理するTODOの一覧をサーバから取得し結果を返す */
        Service.prototype.getList = function () {
            return this.$http.get("/api/todos");
        };

        /** 新規TODOを1件をサーバに投げて追加し結果を返す */
        Service.prototype.insert = function (todo) {
            return this.$http.post("/api/todos", todo);
        };

        /** 指定されたTODOのIDの更新をサーバに投げて結果を返す */
        Service.prototype.update = function (updateId) {
            return this.$http.put("/api/todos", { id: updateId });
        };

        /** 完了済みのTODOの一括削除をサーバに投げて結果を返す */
        Service.prototype.deleteDoneItems = function () {
            return this.$http.delete("/api/todos");
        };
        return Service;
    })();
    TodoApp.Service = Service;
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=todo-service.js.map
