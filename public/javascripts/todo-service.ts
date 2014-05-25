/// <reference path="../../typings/tsd.d.ts" />
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
        constructor(private $http: ng.IHttpService) {
        }

        /** 管理するTODOの一覧をサーバから取得し結果を返す */
        getList(): ng.IHttpPromise<ITodo[]> {
            return this.$http.get("/api/todos");
        }

        /** 新規TODOを1件をサーバに投げて追加し結果を返す */
        insert(todo: ITodo): ng.IHttpPromise<ITodo> {
            return this.$http.post("/api/todos", todo);
        }

        /** 指定されたTODOのIDの更新をサーバに投げて結果を返す */
        update(updateId: number): ng.IHttpPromise<ITodo[]> {
            return this.$http.put("/api/todos", { id: updateId });
        }

        /** 完了済みのTODOの一括削除をサーバに投げて結果を返す */
        deleteDoneItems(): ng.IHttpPromise<ITodo[]> {
            return this.$http.delete("/api/todos");
        }
    }
}