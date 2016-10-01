app.directive('aboutMeToggle', function (){
  return {
  	restrict: 'A',
    controller: 'AboutMe',
    link: function (scope, elem, attrs){

      var initText = angular.element('#initText');
      var aboutMe = angular.element('#about_me');
      var moreText = angular.element('#moreText');
      
      var toggleSplash = function(){
        if(scope.myValue==false){
          initText.fadeOut(150, function(){
            aboutMe.animate({marginLeft: '-=100%'}, 1100, "easeInOutExpo", function(){
              moreText.fadeIn(150);
            });
          });
          scope.aboutMeButton = "Back"
          scope.myValue = true;
        } else {
          moreText.fadeOut(150, function(){
            aboutMe.animate({marginLeft: '+=100%'}, 1100, "easeInOutExpo", function(){
              initText.fadeIn(150);
            });
          });
          scope.aboutMeButton = "A little more about me..."
          scope.myValue = false;
        }
      };
      elem.bind('click', toggleSplash);
    }
  };
});