app.directive('animatedAdjective', function (){
  return {
  	restrict: 'A',
    controller: 'AboutMe',
    link: function (scope, element, attrs) {
      
      var originalValue = element.html();
      var index = -1;
      
      var adjectives = [
        "crazy cat person.",
        "fitness enthusiast.",
        "house music junkie."
      ];
      adjectives.push(originalValue);
      
      element.delay(4000).fadeOut(1000, loop);

      function loop() {
        index = (index + 1) % adjectives.length;
        element.fadeIn(1000).delay(3000).html(adjectives[index]).fadeOut(1000, loop);
      };
    }
  }
});