app.directive('projectInfo', function() {
  return {
    restrict: 'E',
    controller: 'MyWork',
    scope: {
      action: '&'
    },
    link: function (scope, elem, attrs) {
      
      // Preload project images for better height calculations
      var preloadImages = function() {
        for(i = 0; i < scope.projects.length; i++) {
          preloadImage(scope.projects[i].imgURL);
        }
      };    
      var preloadImage = function(url) {
          var img=new Image();
          img.src=url;
      };
      
      // Set variables
      var stage = angular.element('#featuredProject');
      var closeButton = angular.element('#closeButton');
      var stageClosed = scope.stageClosed;
      var resetIndex = scope.index;
      
      // Generate list of project technologies
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
          '<article class="group">'+
          '<div class="imgWrapper"><img src="'+scope.projects[index].imgURL+'" title="'+scope.projects[index].name+'" /></div>'+
          '<h4>'+scope.projects[index].name+'</h4>'+
          scope.projects[index].description+
          '<ul>'+listTechnologies(index)+'</ul>'+
          '</article>'
        );
      };
      
      var closeStage = function() {
        closeButton.animate({opacity: 0, top: '-10px'}, 500, 'easeInOutExpo', function(){});
        var curHeight = stage.height();
        stage.height(curHeight).animate({height: 0, opacity: 0}, 800, 'easeInOutExpo', function (){
          angular.element('article').css('display', 'none');
        });
        stageClosed = true;
      };
      
      var getCurrentStageHeight = function() {
        return stage.height();
      };
      
      var getNewStageHeight = function() {
        stage.css('height', 'auto');
        return stage.innerHeight();
      };
      
      var showProject = function(index) {
        var curHeight = getCurrentStageHeight();
        var newHeight = null;
        if (stageClosed == true) {
          angular.element('html, body').animate({
            scrollTop: angular.element('#featuredProject')
            .offset()
            .top -85 
          }, 700, 'easeInOutExpo', function(){
            loadStage(index);
            newHeight = getNewStageHeight();
            angular.element('article').css('display', 'block');
            stage.height(0).animate({
              height: newHeight, 
              opacity: 1
            }, 800, 'easeInOutExpo', function (){
              closeButton.animate({opacity: .5, top: '10px'}, 500, 'easeInOutExpo', function(){});
            });
          });
          stageClosed = false;
          currentIndex = index;
        } else if (index != currentIndex) {
          var curHeight = getCurrentStageHeight();
          angular.element('html, body').animate({
            scrollTop: angular.element('#featuredProject')
            .offset()
            .top -85 
          }, 700, 'easeInOutExpo', function(){
            stage.animate({
              opacity: 0
            }, 200, 'easeInOutExpo', function(){
              loadStage(index);
              newHeight = getNewStageHeight();
              stage.height(curHeight).animate({
                height: newHeight, 
                opacity: 1
              }, 500, 'easeInOutExpo', function (){});
            });
          });
          currentIndex = index;
        }
      };
      
      scope.$watch('index', function() {
        if(scope.index != null) {
          showProject(scope.index);
        }
      });
      
      scope.$watch('reopenIndex', function() {
        if(scope.reopenIndex != null) {
          showProject(scope.reopenIndex);
        }
      });
      
      closeButton.bind('click', closeStage);
      
      var navItem = angular.element('#projectsNav');
      
      preloadImages();
      
    },
    template: '<button type="button" class="close" data-dismiss="alert" aria-label="Close" id="closeButton"><span aria-hidden="true">x</span></button><nav role="navigation" id="projectsNav"><ul><li ng-repeat="project in projects" class="{{ project.className }} clickable" ng-click="click($index)">{{ project.name }}</li></ul></nav>'
  };
});