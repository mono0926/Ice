/// <reference path="../../typings/tsd.d.ts" />

/// <reference path='todo-model.ts' />
/// <reference path='todo-service.ts' />
/// <reference path='todo-controller.ts' />

module TodoApp {
    angular.module("myModule", [])
        .service("todoService", TodoApp.Service)
        .controller("TodoController", TodoApp.Controller)
    ;
}
