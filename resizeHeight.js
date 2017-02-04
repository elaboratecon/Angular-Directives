(function () {
  "use strict";

  app.directive('resizeHeight', ['$window', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        var stage = angular.element('#featuredProject');

        angular.element($window).bind('resize', function(){
          stage.height('auto');
          scope.$digest();
        });
      }
    };
  }
]);

})();
