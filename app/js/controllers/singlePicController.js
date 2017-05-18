(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('singlePicController', function(API, $sce, $stateParams, $auth) {

            const vm = this;



            let id = $stateParams.id; //this is the id that is sent over

            //This is how we get our Data from the API

            let getSingleImage = API.getSingleImage(id); //this takes that ID and passes it through to vm.currentBlog so we can use on the front end
            getSingleImage.then(res => {
                console.log(res); //see the singleblog.html page where we use vm.currentBlog
                vm.currentPic = res.data;
            })


            let user = $auth.getPayload();

            vm.submit = () => {

                let data = {
                    images: id,
                    content: vm.comment.description,
                    user: user.sub
                }

                
                let addComment = API.addComment(data); //this takes that ID and passes it through to vm.comment so we can use on the front end
                addComment.then(res => {
                    console.log(res); //see the singleblog.html page where we use vm.currentBlog
                    vm.comment = res.data;
                    let getSingleImage = API.getSingleImage(id); //this takes that ID and passes it through to vm.currentBlog so we can use on the front end
                    getSingleImage.then(res => {
                        console.log(res); //see the singleblog.html page where we use vm.currentBlog
                        vm.currentPic = res.data;
                    })
                })

            }


        })
})();
