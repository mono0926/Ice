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
//# sourceMappingURL=todo-controller.js.map
