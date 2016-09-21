app.directive('projectInfo', function() {
  return {
    restrict: 'E',
    controller: 'MyWork',
    scope: {
      action: '&'
    },
    link: function (scope, elem, attrs) {
      
      var stage = angular.element('#featuredProject');
      var stageStatus = scope.stageClosed;

      var closeStage = function() {
        stage.fadeOut(150);
        stage.animate({height: '0px'}, 150, function(){});
        stageStatus = true;
      };
      
      var listTechnologies = function(index){
        var projectTechnologies = scope.projects[index].technologies;
        var lineItems = '';
        for(i = 0; i < projectTechnologies.length; i++) {
          lineItems += '<li>'+projectTechnologies[i]+'</li>';
        }
        return lineItems;
      };
      
      var loadStage = function(index) {
        stage.html(
          '<h3>'+scope.projects[index].name+'</h3>'+
          '<article>'+scope.projects[index].description+'</article>'+
          '<ul>'+listTechnologies(index)+'</ul>'
        );
      };
      
      var showProject = function(index) {
        if (stageStatus == true) {
          loadStage(index);
          stage.fadeIn(150);
          stage.animate({height: '500px'}, 150, function(){});
          stageStatus = false;
        } else {
          stage.fadeOut(150);
          stage.animate({height: '0px'}, 150, function(){
            loadStage(index);
          });
          stageStatus = true;
          
          stage.fadeIn(150);
          stage.animate({height: '500px'}, 150, function(){});
          stageStatus = false;
        }
      };
      
      scope.$watch('index', function() {
        if(scope.index != null) {
          showProject(scope.index);
        }
      });

    },
    template: '<nav role="navigation" id="projectsNav"><ul><li ng-repeat="project in projects" class="{{ project.className }} clickable" ng-click="click($index)">{{ project.name }}</li></ul></nav>'
  };
});