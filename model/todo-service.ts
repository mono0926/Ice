/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./todo-model.ts" />

module TodoApp {
    import ITodo = Model.ITodo;
    export interface IPromise<T> {
        success(callback: (result: T) => void): void;
    }
    export class Service {
        todoList: ITodo[] = [
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
        ]
        constructor(private $timeout: ng.ITimeoutService) {
        }

        getList(): IPromise<ITodo[]> {
            return {
                success: callback => {
                    this.$timeout(() => {
                       callback(angular.copy(this.todoList));
                    });
                }
            }
        }
        insert(todo: ITodo): IPromise<ITodo> {
            var maxId = 0;
            this.todoList.forEach(todo => {
                maxId = Math.max(maxId, todo.id);
            });
            var newTodo = {
                id: maxId + 1,
                text: todo.text,
                done: !!todo.done
            };
            this.todoList.push(newTodo);
            return  {
                success: callback => {
                    this.$timeout(() => {
                        callback(angular.copy(newTodo));
                    });
                }
            }
        }
    }
}