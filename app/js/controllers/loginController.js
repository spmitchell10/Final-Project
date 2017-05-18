(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('loginController', function(API, Upload, $auth,$location) {


            // Facebook Authentication

            const vm = this

            vm.authenticate = function(provider) {
                let login = $auth.authenticate(provider);

                login.then((res)=>{
                    console.log(res);
                    $location.path('/home');
                })
            };



        })
})();
