(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('landing', {
        url: '/',
        controller: 'LandingCtrl as landing',
        templateUrl: '/templates/landing.html'
      })
      .state('album', {
        url: '/album',
        controller: 'AlbumCtrl as album',
        templateUrl: '/templates/album.html'
      })
      .state('collection', {
        url: '/collection',
        controller: 'CollectionCtrl as collection',
        templateUrl: '/templates/collection.html'
      })
      .state('login', {
        url: '/login',
        controller: 'RegisterCtrl',
        templateUrl: '/templates/login.html'
      })
      .state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: '/templates/register.html'
      });
  }


  angular
    .module('blocJams', ['ui.router', ])
    .config(config);
})();
