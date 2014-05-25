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
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./todo-model.ts" />
/// <reference path="./todo-service.ts" />
var TodoApp;
(function (TodoApp) {
    var Controller = (function () {
        function Controller($scope, todoService) {
            var _this = this;
            this.$scope = $scope;
            this.todoService = todoService;
            this.$scope.insert = this.insert.bind(this);
            this.$scope.update = this.update.bind(this);
            this.$scope.deleteDoneItems = this.deleteDoneItems.bind(this);

            this.todoService.getList().success(function (todoList) {
                _this.$scope.todoList = todoList;
            });
        }
        Controller.prototype.insert = function () {
            var _this = this;
            var todo = {
                text: this.$scope.text,
                done: false
            };
            this.todoService.insert(todo).success(function (todo) {
                _this.$scope.todoList.push(todo);
                _this.$scope.text = "";
            });
        };

        /** 指定されたTODOをServiceクラスのupdateメソッドに渡し、表示データを更新する */
        Controller.prototype.update = function (updateTodo) {
            var _this = this;
            this.todoService.update(updateTodo.id).success(function (todoList) {
                _this.$scope.todoList = todoList;
            });
        };

        /** ServiceクラスのdeleteDoneItemsメソッドを呼び出し、表示データを更新する */
        Controller.prototype.deleteDoneItems = function () {
            var _this = this;
            this.todoService.deleteDoneItems().success(function (newTodoList) {
                _this.$scope.todoList = newTodoList;
            });
        };
        return Controller;
    })();
    TodoApp.Controller = Controller;
})(TodoApp || (TodoApp = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path='todo-model.ts' />
/// <reference path='todo-service.ts' />
/// <reference path='todo-controller.ts' />
var TodoApp;
(function (TodoApp) {
    angular.module("myModule", []).service("todoService", TodoApp.Service).controller("TodoController", TodoApp.Controller);
})(TodoApp || (TodoApp = {}));
