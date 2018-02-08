/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
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

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $window ) {
  var vm = this;
  vm.mrAlpacaDesc = 'We are Mr. Alpaca Games, a video games studio from Colombia';

  activate();
  function activate() {
    var opThresh = 350;
    var opFactor = 750;
    
    $window.addEventListener("scroll", function(event){
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
  }
})

;

