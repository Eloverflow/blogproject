'use strict';
angular.module('starter.controllers')
    .controller('PortfolioCtrl', function($scope, $route) {

        $scope.slides = [];
        $scope.greetings = "ahahah";

        $scope.$on('$viewContentLoaded', function() {
            console.log('$route.current', $route.current);
            if($route.current.$$route.originalPath === '/blogproject'){
                $scope.slides = [
                    {image: 'img/projects/blogproject/bp_content.png', description: 'Image 00'},
                    {image: 'img/projects/blogproject/bp_menu.png', description: 'Image 01'},
                    {image: 'img/projects/blogproject/bp_newpost.png', description: 'Image 02'},
                    {image: 'img/projects/blogproject/bp_profile.png', description: 'Image 03'},
                    {image: 'img/projects/blogproject/bp_userlist.png', description: 'Image 04'}
                ];
            } else if($route.current.$$route.originalPath === '/web-bot-generator'){
                $scope.slides = [
                    {image: 'img/projects/web-bot-generator/1.png', description: 'Image 00'},
                    {image: 'img/projects/web-bot-generator/2.png', description: 'Image 01'},
                    {image: 'img/projects/web-bot-generator/3.png', description: 'Image 02'},
                    {image: 'img/projects/web-bot-generator/4.png', description: 'Image 03'},
                    {image: 'img/projects/web-bot-generator/5.png', description: 'Image 04'},
                    {image: 'img/projects/web-bot-generator/6.png', description: 'Image 05'},
                    {image: 'img/projects/web-bot-generator/7.png', description: 'Image 06'},
                    {image: 'img/projects/web-bot-generator/8.png', description: 'Image 07'},
                    {image: 'img/projects/web-bot-generator/9.png', description: 'Image 08'},
                    {image: 'img/projects/web-bot-generator/10.png', description: 'Image 09'},
                    {image: 'img/projects/web-bot-generator/11.png', description: 'Image 10'},
                    {image: 'img/projects/web-bot-generator/12.png', description: 'Image 11'}
                ];
            } else if($route.current.$$route.originalPath === '/posio'){
                $scope.slides = [
                    {image: 'img/projects/posio/posioScheduleCapture.png', description: 'Image 00'},
                    {image: 'img/projects/posio/posioPlanCaptureBigger.png', description: 'Image 01'},
                    {image: 'img/projects/posio/posioWorkTitleCaptureBigger.png', description: 'Image 02'},
                    {image: 'img/projects/posio/posioMenuPadCaptureBigger.png', description: 'Image 03'},
                    {image: 'img/projects/posio/posMenuCapture.png', description: 'Image 04'},
                    {image: 'img/projects/posio/posioMenuPlanCapture.png', description: 'Image 05'},
                    {image: 'img/projects/posio/posioMenuBillsCaptureBigger.png', description: 'Image 06'},
                    {image: 'img/projects/posio/posioCalendarCapture.png', description: 'Image 07'}
                ];
            }
        });




        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    })
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };

    });



