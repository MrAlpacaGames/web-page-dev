angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        controllerAs: 'homeCtrlVm',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Mr. Alpaca Games' }
  });
})
.controller( 'HomeCtrl', function HomeController( $scope, $window, $timeout ) {
  var vm = this;
  vm.mrAlpacaDesc = 'We are Mr. Alpaca Games, a video games studio from Colombia';

  activate();
  function activate() {
    var opThresh = 350;
    var opFactor = 750;
    
    $window.addEventListener("scroll", function(event) {
      var top = this.pageYOffset;
      var layers = document.getElementsByClassName("parallax-layer");
      var layer, speed, yPos;

      for (var i = 0; i < layers.length; i++) {
        layer = layers[i];
        speed = layer.getAttribute('data-speed');
        yPos = -(top * speed / 100);
        layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');
      }
    });

    $window.addEventListener("resize", handleVideo);
    $timeout(handleVideo, 200);
  }

  /*jshint -W065 */
  function handleVideo() {
    var vidHolder = document.getElementsByClassName("trailer-wrapper");
    var iframe = null;
    var resolution = null;
    var youtubeHeight = 0;
    var youtubeWidth = 0;

    for (var i = 0; i < vidHolder.length; i ++) {
      if  (vidHolder[i] !== undefined) {
        iframe = vidHolder[i].getElementsByTagName("iframe")[0];
        youtubeHeight = parseInt(vidHolder[i].getAttribute("data-original-height"));
        youtubeWidth = parseInt(vidHolder[i].getAttribute("data-original-width"));
        resolution = youtubeHeight / youtubeWidth;

        if (iframe !== undefined) {
          iframe.style.width = vidHolder[i].offsetWidth + "px";
          iframe.style.height = vidHolder[i].style.height = (vidHolder[i].offsetWidth * resolution) + "px"; 
        }

        lastVideoWidth = vidHolder[i].offsetWidth;
      }
    }
  }
})

;

