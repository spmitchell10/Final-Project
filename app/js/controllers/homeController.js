(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('homeController', function(API) {





            // Facebook Authentication
            const vm = this;

            // Post pictures to DB

            let images = API.getImages();
            images.then(res => {
                console.log(res);
                vm.images = res.data;
            })

            // // Get a single image

            // vm.singleImage = ((id) => {
            //     let getSingleImage = API.getSingleImage(id);
            //     getSingleImage.then(res => {
            //         console.log(res);
            //         vm.currentImage = res.data;
            //         $('#myUserModal').modal('show')

            //     })
            // })


        })
})();
