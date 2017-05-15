(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('homeController', function(API, Upload, $auth,$location) {


            // Facebook Authentication

            const vm = this

            vm.authenticate = function(provider) {
                $auth.authenticate(provider);
                $location.path('/home');
            };

        })
})();
