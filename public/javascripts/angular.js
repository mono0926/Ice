/// <reference path="../../typings/tsd.d.ts" />
function HelloWorldController($scope) {
    $scope.message = 'Hello World!!';
}
function SampleController($scope) {
    $scope.simple = '簡易記法を使った方法';
    $scope.directive = 'ディレクティブを使った方法';
}
function SampleController2($scope) {
    $scope.text = 'TextBox';
    $scope.checkbox = true;
    $scope.radio = 'FUGA';
    $scope.select = 'foo';
}
function SampleController3($scope) {
    $scope.click = function () {
        $scope.message = 'click button!';
    };
}
function SampleController4($scope) {
    $scope.items = [
        { key: 'hoge', value: 'HOGE' },
        { key: 'fuga', value: 'FUGA' },
        { key: 'piyo', value: 'PIYO' }
    ];
}
function SampleController5($scope) {
    $scope.hidden = true;
    $scope.click = function () {
        $scope.hidden = !$scope.hidden;
    };
}
function SampleController6($scope) {
    $scope.hoge = 'red solid-border';
    $scope.isRed = true;
    $scope.isDotted = true;
}
function SampleController7($scope) {
    $scope.url = 'http://mono0926.com/';
    $scope.imageFileName = 'mate.png';
}
function SampleController8($scope) {
    $scope.message = 'hoge';
    $scope.change = function () {
        $scope.message = 'change!!';
    };
}
function SampleController9($scope) {
    $scope.hoge = 0;
    $scope.fuga = 0;
    $scope.sum = 0;

    // Angular式
    //    $scope.$watch('hoge + fuga', 'sum = hoge + fuga');
    // 関数式
    $scope.$watch(function () {
        return $scope.hoge + $scope.fuga;
    }, function () {
        $scope.sum = $scope.hoge + $scope.fuga;
    });
}
(function () {
    var myModule = angular.module('myModule', ['ngRoute']);

    // モジュールを定義する
    myModule.controller('SampleController10', function ($scope) {
        $scope.message = 'module';
    });

    // 依存するインスタンス（サービス）をインジェクションする
    myModule.service('sampleService', SampleService);
    myModule.controller('SampleController11', function ($scope, sampleService) {
        $scope.message = sampleService.method();
    });

    function SampleService() {
        this.method = function () {
            return 'sample service';
        };
    }

    // フィルターを自作する
    myModule.filter('myFilter', function () {
        return function (value, param1, param2) {
            return param1 + value + param2;
        };
    });

    // ngRouteモジュールを追加する
    myModule.config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'RootController',
            templateUrl: 'users'
        });
    });
    myModule.controller('RootController', function ($scope) {
        $scope.message = 'message by RootController.';
    });
})();
function SampleController12($scope) {
    $scope.money = 1000;
}
function SampleController13($scope) {
    $scope.array1 = ["hoge", "fuga", "piyo"];
    $scope.array2 = [
        "hoge",
        "fuga",
        { a: "hoge" },
        { a: "fuga" },
        { b: { c: "hoge" } },
        { b: { c: "fuga" } }
    ];
}
function SampleController14($scope) {
    $scope.physicists = [
        { firstName: 'Johannes', lastName: 'Kepler' },
        { firstName: 'Galileo', lastName: 'Galilei' },
        { firstName: 'Thomas', lastName: 'Young' },
        { firstName: 'Michael', lastName: 'Faraday' },
        { firstName: 'Edward', lastName: 'Morley' },
        { firstName: 'Niels', lastName: 'Bohr' }
    ];
}
function SampleController15($scope) {
    $scope.isEvenNumber = function (number) {
        return number % 2 == 0;
    };
}
function SampleController16($scope) {
    $scope.contains = function (actual, expected) {
        return actual.indexOf(expected) != -1;
    };
}
//# sourceMappingURL=angular.js.map
