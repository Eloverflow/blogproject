'use strict';

angular.module('starter.controllers')

.controller('PageServicesCtrl', function($scope, getReq, delReq, $location, API_ENDPOINT, postReq) {

    var scale = 4;
    var opacity = 0.3;
    var mouseX = 0, mouseY = 0,

        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2,


        SEPARATION = 200,
        AMOUNTX = 1,
        AMOUNTY = 1,

        camera, scene, renderer,nbrLine;

    init();
    animate();

    $scope.$on("$destroy", function(){
        $('.wrapper-boxed').animate({
            'background-color': 'rgba(255,255,255,1)'
        }, 150);

        $('.main-footer').animate({
            'background-color': 'rgba(39,39,39,1)'
        }, 150);

        destroy();
    });

        function destroy() {
            renderer = null;
            scene = null;
            camera = null;
            window.removeEventListener( 'resize', onWindowResize, false );
        }

        function init() {
            $('.main-footer').animate({
                'background-color': 'rgba(39,39,39,0.9)'
            }, 400)

            $('.wrapper-boxed').animate({
                'background-color': 'rgba(255,255,255,0.9)'
            }, 400);
            //$('.main-footer').fadeTo(0.5, 0.9);


            if (screen.width > 480) {

                if (/MSIE 10/i.test(navigator.userAgent) ||
                    /MSIE 9/i.test(navigator.userAgent) ||
                    /rv:11.0/i.test(navigator.userAgent) ||
                    /Edge\/\d./i.test(navigator.userAgent)) {
                    // This is internet explorer 10
                    nbrLine = 200;
                }else if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)){
                    nbrLine = 600;
                }else {
                    nbrLine = 400;
                }

            }
            else {
                nbrLine = 120;
                scale = 10;
                opacity = 0.8;
            }

            /*
             *   Define variables
             */
            var container, separation = 1000, amountX = 50, amountY = 50, color = 0x333333,
                particles, particle;

            container = document.getElementById("canvas");


            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
            camera.position.z = 100;

            scene = new THREE.Scene();

            renderer = new THREE.CanvasRenderer({alpha: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x000000, 0);   // canvas background color
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);


            var PI2 = Math.PI * 2;
            var material = new THREE.SpriteCanvasMaterial({

                color: "#286090",
                opacity: 1,
                program: function (context) {

                    context.beginPath();
                    context.arc(0, 0, 0.3, 0, PI2, true);
                    context.fill();

                }

            });

            var geometry = new THREE.Geometry();

            /*
             *   Number of particles
             */
            for (var i = 0; i < nbrLine; i++) {

                particle = new THREE.Sprite(material);
                particle.position.x = Math.random() * 2 - 1;
                particle.position.y = Math.random() * 2 - 1;
                particle.position.z = Math.random() * 2 - 1;
                particle.position.normalize();
                particle.position.multiplyScalar(Math.random() * 10 + 100);
                particle.scale.x = particle.scale.y = scale;

                scene.add(particle);

                geometry.vertices.push(particle.position);

            }

            /*
             *   Lines
             */

            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: color, opacity: opacity}));
            scene.add(line);

            if (screen.width > 480)
            document.addEventListener('mousemove', onDocumentMouseMove, false);

            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);
            window.onscroll = function() {onDocumentScroll()};
            //

            window.addEventListener('resize', onWindowResize, false);

        }



        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function onDocumentMouseMove(event) {

            mouseX = (event.clientX - windowHalfX) * 0.05 * 3;
            mouseY = (event.clientY - windowHalfY) * 0.2 * 2+120;

        }

        function onDocumentScroll(event) {
            mouseY = (document.body.scrollTop - windowHalfY) * 0.2 * 2+120;
        }

        function onDocumentTouchStart( event ) {

            if ( event.touches.length > 1 ) {
                mouseX = (event.touches[ 0 ].pageX - windowHalfX) * 0.4;
            }

        }

        function onDocumentTouchMove( event ) {

            if ( event.touches.length == 1 ) {
                mouseX = event.touches[ 0 ].pageX - windowHalfX;
            }

        }

        //

        function animate() {

            requestAnimationFrame( animate );

            render();

        }

        function render() {
            if(camera){
                camera.position.x += ( mouseX - camera.position.x ) * 0.1;
                camera.position.y += ( - mouseY + 200 - camera.position.y ) * 0.05;
                camera.lookAt( scene.position );

                renderer.render( scene, camera );
            }
        }

})


