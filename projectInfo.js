(function () {
  "use strict";

  app.directive('projectInfo', function () {
    return {
      restrict: 'E',
      controller: 'MyWork',
      scope: { action: '&' },
      link: function (scope, elem, attrs) {

        //VARIABLES
        var body,
            stage,
            closeButton,
            stageClosed,
            distFromTop,
            currentIndex;

        //METHODS
        var preloadImage,
            preloadImages,
            getDistFromTop,
            listTechnologies,
            loadStage,
            closeStage,
            openStage,
            switchProject,
            scrollToTop,
            getCurrentStageHeight,
            getNewStageHeight,
            showProject;


        //Assign variables
        body = angular.element('html,body');
        stage = angular.element('#featuredProject');
        closeButton = angular.element('#closeButton');
        stageClosed = scope.stageClosed;


        //Assign methods
        preloadImage = function (url) {
            var img = new Image();
            img.src = url;
        };

        preloadImages = function () {
          for(var i = 0; i < scope.projects.length; i++) {
            preloadImage(scope.projects[i].imgURL);
          }
        };

        getDistFromTop = function () {
          var distFromTopHTML = angular.element('html').scrollTop();
          var distFromTopBody = angular.element('body').scrollTop();
          return Math.max(distFromTopHTML, distFromTopBody);
        };

        // Generate list of project technologies
        listTechnologies = function (index) {
          var projectTechnologies = scope.projects[index].technologies;
          var lineItems = '';
          for(var i = 0; i < projectTechnologies.length; i++) {
            lineItems += '<li>'+projectTechnologies[i]+'</li>';
          }
          return lineItems;
        };

        loadStage = function (index) {
          stage.html(
            '<article class="group">'+
            '<div class="imgWrapper"><img src="'+scope.projects[index].imgURL+'" title="'+scope.projects[index].name+'" /></div>'+
            '<h4>'+scope.projects[index].name+'</h4>'+
            scope.projects[index].description+
            '<ul>'+listTechnologies(index)+'</ul>'+
            '</article>'
          );
        };

        closeStage = function () {
          var curHeight = stage.height();
          //Button retracts
          closeButton.animate({
            opacity: 0,
            top: '-10px'
          }, 200, 'easeInOutExpo', function(){
            //Close stage
            stage.height(curHeight).animate({
              height: 0,
              opacity: 0
            }, 800, 'easeInOutExpo', function (){
              angular.element('article').css('display', 'none');
              stageClosed = true;
            });
          });
        };

        openStage = function (index, newHeight) {
          angular.element('article').css('display', 'block');
          //Open stage
          stage.height(0).animate({
            height: newHeight,
            opacity: 1
          }, 800, 'easeInOutExpo', function () {
            //Extend close button
            closeButton.animate({opacity: 0.5, top: '10px'}, 200, 'easeInOutExpo', function () {
              stageClosed = false;
              currentIndex = index;
            });
          });
        };

        switchProject = function (index, curHeight, newHeight) {
          stage.height(curHeight).animate({
            height: newHeight,
            opacity: 1
          }, 500, 'easeInOutExpo', function () {
            currentIndex = index;
          });
          return currentIndex;
        };

        scrollToTop = function () {
          body.animate({
            scrollTop: angular.element('#featuredProject').offset().top -85
          }, 700, 'easeInOutExpo');
        };

        getCurrentStageHeight = function () {
          return stage.height();
        };

        getNewStageHeight = function () {
          stage.css('height', 'auto');
          return stage.innerHeight();
        };

        showProject = function (index) {
          //IF stage is closed, open stage
          if (stageClosed === true) {
            if(getDistFromTop() > 0) {
              scrollToTop();
            }
            loadStage(index);
            setTimeout(openStage(index, getNewStageHeight()), 200);

            //OR switch projects
          } else if (stageClosed === false && index !== currentIndex) {
            if(getDistFromTop() > 0) {
              scrollToTop();
            }
            stage.animate({opacity: 0}, 200, 'easeInOutExpo', function () {
              loadStage(index);
              setTimeout(switchProject(index, getCurrentStageHeight(), getNewStageHeight()), 200);
            }
          )}
        };

        //Watch for variable changes
        scope.$watch('index', function () {
          if(scope.index != null) {
            showProject(scope.index);
          }
        });

        scope.$watch('reopenIndex', function () {
          if(scope.reopenIndex != null) {
            showProject(scope.reopenIndex);
          }
        });

      //Bind click events
      closeButton.bind('click', closeStage);

      //Preload project images for quicker height math
      preloadImages();
    },
    template: '<button type="button" class="close" data-dismiss="alert" aria-label="Close" id="closeButton"><span aria-hidden="true">x</span></button><nav role="navigation" id="projectsNav"><ul><li ng-repeat="project in projects" class="{{ project.className }} clickable" ng-click="click($index)">{{ project.name }}</li></ul></nav>'};
  });

})();
