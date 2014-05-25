/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./todo-model.ts" />
/// <reference path="./todo-service.ts" />

module TodoApp {
    import ITodo = Model.ITodo;

    export interface Scope extends ng.IScope {
        text: string;

        insert(): void;
        update(todo: ITodo): void;
        deleteDoneItems(): void;

        todoList: TodoApp.Model.ITodo[];
    }

    export class Controller {
        constructor(public $scope: Scope, public todoService: TodoApp.Service) {
            this.$scope.insert = this.insert.bind(this);
            this.$scope.update = this.update.bind(this);
            this.$scope.deleteDoneItems = this.deleteDoneItems.bind(this);

            this.todoService.getList()
            .success(todoList => {
                    this.$scope.todoList = todoList;
                })
        }

        insert(): void {
            var todo: ITodo = {
                text: this.$scope.text,
                done: false
            };
            this.todoService.insert(todo)
            .success(todo =>
                {
                    this.$scope.todoList.push(todo);
                    this.$scope.text = "";
                })
        }

        /** 指定されたTODOをServiceクラスのupdateメソッドに渡し、表示データを更新する */
        update(updateTodo: ITodo): void {
            this.todoService.update(updateTodo.id)
                .success(todoList=> {
                    this.$scope.todoList = todoList;
                });
        }

        /** ServiceクラスのdeleteDoneItemsメソッドを呼び出し、表示データを更新する */
        deleteDoneItems(): void {
            this.todoService.deleteDoneItems()
                .success(newTodoList => {
                    this.$scope.todoList = newTodoList;
                });
        }
    }
}