(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('albumController', function(API, $sce, $stateParams, $auth) {

            const vm = this;

            let user = $auth.getPayload();

            vm.submit = () => {

                let album = {
                    title: vm.title,
                    user: user.sub
                }

                
                let addAlbum = API.addAlbum(album); //this takes that ID and passes it through to vm.comment so we can use on the front end
                addAlbum.then(res => {
                    console.log(res); //see the singleblog.html page where we use vm.currentBlog
                    vm.album = res.data;
                    
                })

            }


        })
})();