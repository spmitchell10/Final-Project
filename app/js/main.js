(function() {
    'use strict';

    angular
        .module('familyshare', ['ui.router','ngFileUpload', 'satellizer'])
        .config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

            $authProvider.facebook({
              clientId: '1891953407744379',
              name: 'facebook',
              url: '/auth/facebook',
              authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
              redirectUri: window.location.origin + '/',
              requiredUrlParams: ['display', 'scope'],
              scope: ['email'],
              scopeDelimiter: ',',
              display: 'popup',
              oauthType: '2.0',
              popupOptions: { width: 580, height: 400 }
            })


            $stateProvider
                .state('login', {
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: '../partials/login.html',
                            controller: 'loginController',
                            controllerAs: 'vm',
                        },
                        'nav': {
                            templateUrl: '../partials/nav.html',
                            controller: 'navController',
                            controllerAs: 'vm',
                          }

                    }
                }),


            $stateProvider
                .state('home', {
                    url: '/home',
                    views: {
                        'content': {
                            templateUrl: '../partials/home.html',
                            controller: 'homeController',
                            controllerAs: 'vm',
                        },
                        'nav': {
                            templateUrl: '../partials/nav.html',
                            controller: 'navController',
                            controllerAs: 'vm',
                          }

                    }
            }),

            $stateProvider
                .state('albumPics', {
                    url: '/albumpics/:id',
                    views: {
                        'content': {
                            templateUrl: '../partials/albumPics.html',
                            controller: 'albumPicsController',
                            controllerAs: 'vm',
                        },
                        'nav': {
                            templateUrl: '../partials/nav.html',
                            controller: 'navController',
                            controllerAs: 'vm',
                          }

                    }
            }),

            $stateProvider
                .state('singlePic', {
                    url: '/pic/:id',
                    views: {
                        'content': {
                            templateUrl: '../partials/singlePic.html',
                            controller: 'singlePicController',
                            controllerAs: 'vm',
                        },
                        'nav': {
                            templateUrl: '../partials/nav.html',
                            controller: 'navController',
                            controllerAs: 'vm',
                          }

                    }
            }),

            $stateProvider
                .state('album', {
                    url: '/album',
                    views: {
                        'content': {
                            templateUrl: '../partials/album.html',
                            controller: 'albumController',
                            controllerAs: 'vm',
                        },
                        'nav': {
                            templateUrl: '../partials/nav.html',
                            controller: 'navController',
                            controllerAs: 'vm',
                          }

                    }
            }),

            $stateProvider
	            .state('pic', {
	                url: '/pic',
	                views: {
	                    'content': {
	                        templateUrl: '../partials/addpic.html',
	                        controller: 'TableController',
	                        controllerAs: 'vm',
	                    },
                      'nav': {
                            templateUrl: '../partials/nav.html',
                            controller: 'navController',
                            controllerAs: 'vm',
                          }

	                }
	            })

        })

})();
