'use strict';

// main App module
var app = angular.module("app",[
    'ngRoute',
    'appControllers',
    'appServices',
    'xeditable'
]);


var appTest = angular.module("app_Tests",['ngMock']);


// Конфигурация роутинга
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'taskListCtrl',
            template: '<task-list data="tasks" class="panel panel-default"></task-list>'
        })
        .when('/task-info-:id', {
            controller: 'taskCtrl',
            template: '<task-details data="tasks" class="panel panel-default"></task-details>'
        })
        .otherwise({
            redirectTo: '/'
        });
});


//фабрика, которая отвечает за получение данных с сервера
var appServices = angular.module('appServices', []);

appServices.factory('tasksData', ['$http', function($http){
    var DATA_URL = 'data/tasks.json';

    return $http.get(DATA_URL)
        .success(function(data, status, headers){
            return data;
        })
        .error(function(err){
            return err;
        });
}]);


//основной контроллер
app.controller('mainController',['$scope','tasksData',function ($scope, tasksData){
    tasksData.success(function(data){
        $scope.tasks = data;

        console.log('mainController', $scope.tasks);
    });
}]);


//sub controllers. Контроллеры для отображения информации
var appControllers = angular.module('appControllers', []);

//контроллер для списка задач
appControllers.controller('taskListCtrl', ['$scope', 'tasksData', '$http', function ($scope, tasksData, $http) {
    tasksData.success(function(data){
        $scope.tasks = data;
    });
}]);

//контроллер для деталировки задачи
appControllers.controller('taskCtrl',['$scope','tasksData', '$routeParams', '$http',function ($scope, tasksData, $routeParams, $http){
        tasksData.success(function(data){
            $scope.task = data[$routeParams.id];
        });

        $scope.updateTask = function() {
            $http.put($scope.task.id + '/edit/', $scope.task);
        };
}]);


//директивы для заполнения отображений
app.directive('taskList', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/taskList.html'
    };
});

app.directive('taskDetails', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/taskDetails.html'
    };
});