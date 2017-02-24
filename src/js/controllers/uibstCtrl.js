'use strict';
App.controller('carouselCtrl', ['$scope', function($scope){
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//unsplash.it/' + newWidth + '/300',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };
  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }
}]);


App.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log){
  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
}]);


App.controller('ModalDemoCtrl', ['$scope', '$uibModal', function($scope, $uibModal){
  $scope.item = ['item1', 'item2', 'item3'];
  $scope.open = function(type, size){
    $scope.close = function(){
      modalInstance.close();
    }
    var _type = type;
    /**
      animation：是否使用動畫；appendTo：彈窗添加的位置，默認為body；backdrop：是否顯示遮罩層，默認true；
      backdropClass: 定製遮罩層；controller: 彈窗控制器；resolve：使用controller時的數據保證；scope: 作用域；
      size：modal-lg、modal-sm不添加為普通；templateUrl：頁面中的script id;
    */
    var modalInstance = $uibModal.open({
      animation: true,
      size: size,
      templateUrl: _type,
      scope: $scope
    })
  }
}])
