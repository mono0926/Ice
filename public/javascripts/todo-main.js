/// <reference path="../../typings/tsd.d.ts" />
/// <reference path='todo-model.ts' />
/// <reference path='todo-service.ts' />
/// <reference path='todo-controller.ts' />
var TodoApp;
(function (TodoApp) {
    angular.module("myModule", []).service("todoService", TodoApp.Service).controller("TodoController", TodoApp.Controller);
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=todo-main.js.map
