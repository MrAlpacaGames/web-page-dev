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
.controller( 'HomeCtrl', function HomeController( $scope, $window, $timeout, $document ) {
  var vm = this;
  var layers = [];
  var banner = null;

  activate();
  function activate() {
    $timeout(readDom, 200);
  }
  
  function readDom() {
    var layerElements = $document[0].querySelectorAll(".parallax-layer");
    
    banner = $document[0].querySelectorAll("#parallax-container")[0];
    for (var i = 0; i < layerElements.length; i ++) {
      layers.push({
        element: layerElements[i],
        scroll: layerElements[i].getAttribute("data-scroll"),
        offset: layerElements[i].getAttribute("data-yoffset")
      });
    }
    layerElements = null;
    
    $document[0].addEventListener("scroll", updateScrollValue);
    $window.addEventListener("resize", handleVideo);
    $window.addEventListener("resize", updateScrollValue);
    updateScrollValue();
    handleVideo();
  }

  // update a speicifc layer offset
  function updateLayerOffset(scroll, layer) {
    var offset = -((scroll * layer.scroll) - layer.offset * (banner.clientHeight / 3680));
    layer.element.style.transform = "translate3d(0, " + offset + "px, 0)";
  }

  function updateScrollValue() {
    var scroll = $window.scrollY;
    for (var i = 0; i < layers.length; i ++) {
        updateLayerOffset(scroll, layers[i]);
    }
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
/*// When the user scrolls the page, execute myFunction 
window.onscroll = function() {stickyBar()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;
  function stickyBar() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }*/
})

;

