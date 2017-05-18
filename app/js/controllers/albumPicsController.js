(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('albumPicsController', function(API,$stateParams) {





            // Facebook Authentication
            const vm = this;

            // Post pictures to DB

            let id = $stateParams.id;

            let album = API.getAlbum(id);
            album.then(res => {
                console.log(res);
                vm.album = res.data;
            })

            // // Get a single image

            // vm.singleImage = ((id) => {
            //     let getSingleImage = API.getSingleImage(id);
            //     getSingleImage.then(res => {
            //         console.log(res);
            //         vm.currentImage = res.data;
                    

            //     })
            // })


        })
})();
