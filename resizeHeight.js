app.directive('resizeHeight', ['$window', function ($window) {
    
  return {
    link: link,
    restrict: 'A'
  };
  
  function link(scope, element, attrs){
      
    var stage = angular.element('#featuredProject');

    angular.element($window).bind('resize', function(){
      stage.height('auto');
      scope.$digest();
    });
  }
}]);



