(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('TableController', function(API,Upload,$scope,$auth) {


            
            // // Post a picture 

            const vm = this;

            let getAlbum = API.getAlbum(); //this takes that ID and passes it through to vm.currentBlog so we can use on the front end
            getAlbum.then(res => {
                console.log(res); //see the singleblog.html page where we use vm.currentBlog
                vm.album = res.data;
            })
            


            $scope.submit = function() {
              if ($scope.form.file.$valid && $scope.file) {

                $scope.upload($scope.file);
              }
            };

            $scope.upload = function (file) {
                let user = $auth.getPayload();
                vm.images.user = user.sub;
                Upload.upload({
                    url: 'http://localhost:3000/picupload',
                    data: {file: file, info:vm.images}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.image);
                    vm.image = resp.data.image;
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                });
            };

            

            // // Like a picture on Modal

            // vm.likeImage = (item => {
            //     let image = API.likeImage(item._id);
            //     image.then(res => {
            //         console.log(res);
            //         item.likes = res.data.data.likes + 1;
            //     })
            // })

            // // Like a picutre on the Home Page

            // vm.likeImageHomePage = (item => {
            //     let imageMain = API.likeImage(item._id);
            //     imageMain.then(res => {
            //         console.log(res);
            //         item.likes = res.data.data.likes + 1;
            //     })
            // })
        })
})();
