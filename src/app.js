'use strict';

//Declare app level module which depends on views, and components
var App = angular.module('myApp', [
  'ui.router',
  'ui.bootstrap.carousel',
  'ui.bootstrap.pagination',
  'ui.bootstrap.paging',
  'ui.bootstrap.tabindex',
  'ui.bootstrap.modal',
  'ui.bootstrap.multiMap',
  'ui.bootstrap.stackedMap',
  'ui.bootstrap.position'
]);

//项目的初始函数和前端路由定义
App.run(function(){
      //初始执行函数
    })
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
        // $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        // $httpProvider.interceptors.push('tokenMarker');

        //使用angular-ui-router, 前端路由在此配置
        $stateProvider.state('index', {
              url: '/index',
              views: {
                  '': {
                      templateUrl: 'htmls/nav.html',
                      controller: 'rootCtrl'
                  }
              }
          })
          .state('carousel', {
                url: '/index/carousel',
                views: {
                    '': {
                        templateUrl: 'htmls/carousel.html'
                    }
                }
            })
          .state('pagination', {
                url: '/index/pagination',
                views: {
                    '': {
                        templateUrl: 'htmls/pagination.html'
                    }
                }
            })
          .state('modal', {
                url: '/index/modal',
                views: {
                    '': {
                        templateUrl: 'htmls/modal.html'
                    }
                }
            })
        $urlRouterProvider.otherwise('/index');
    }])

    // // http拦截器 注入token 并记录加载状态 优化体验
    // .factory('tokenMarker', ["$rootScope",'$location','$cookies',function ($rootScope,$location,$cookies) {
    //     var tokenMarker = {
    //         request: function (config) {
    //             // config.headers['x-access-token']=$cookies.get('token')?$cookies.get('token'):null
    //             // $rootScope.loading = true;
    //             // config.requestTimestamp = new Date().getTime();
    //             // return config;
    //         },
    //         response: function (response) {
    //             // $rootScope.loading = false;
    //             // response.config.responseTimestamp = new Date().getTime();
    //             // return response;
    //         },
    //         responseError:function(rejectReason){
    //             //$location.path('/404').search('')
    //             // console.log(rejectReason)
    //             // $rootScope.loading = false;
    //             // return rejectReason
    //         },
    //         requestError:function(rejectReason){
    //             // console.log(rejectReason)
    //             //$location.path('/404').search('')
    //             // $rootScope.loading = false;
    //             // return rejectReason
    //         }
    //     };
    //     return tokenMarker;
    // }])
