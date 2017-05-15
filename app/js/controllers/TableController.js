(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('TableController', function(API,Upload,$scope,$auth) {

 
            // Functions for Hamburger Menu and navBarHidden jQuery

            (() => {
                $('.hamburgerMenu').on('click', function() {
                    $('.bar').toggleClass('animate');
                })
            })();

            (() => {
                $('.hamburgerMenu').on('click', function() {
                    $('.navBar').toggleClass('navBarHidden');
                })
            })();

            (() => {
                $('.floatingChat').on('click', function() {
                    $('.chatBar').toggleClass('chatBarHidden');
                })
            })();

            var $chat = $(".messages");
            $chat.scrollTop($chat.height());

            //------------------------------------------------------

            // Functions for the Socket/Messaging Feature

            var socket = io();

            $('.message').submit((e) => {
                e.preventDefault();
                socket.emit('chat message', $('.messageInput').val());
                $('.messageInput').val('');
                return false;
            });


            socket.on('new message', (msg) => {
                $('#messages').append(`<li>${msg.msg}</li>`);
                $("messages").scrollTop($("messages")[0].scrollHeight + 52);
            });

            socket.on('got error', msg => {
                alert(msg);
            })


            //------------------------------------------------------

            const vm = this;

            // Post pictures to DB

            let images = API.postImages();
            images.then(res => {
                console.log(res);
                vm.images = res.data;
            })

            // // Post a picture 

            vm.addImage = ((fda) => {

                    
                    
                    let file = document.getElementById('singleFile');
                    let getNewImage = API.addImage(form);
                    getNewImage.then(res => {
                        console.log(res);
                       
                        let images = API.postImages();
                        images.then(res => {
                            console.log(res);
                            vm.images = res.data;
                        })

                    });
                    vm.image = {};
            })


            $scope.submit = function() {
              if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
              }
            };

            $scope.upload = function (file) {
                Upload.upload({
                    url: 'http://localhost:3000/vidupload',
                    data: {file: file, info:vm.images}
                }).then(function (resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.image);
                    vm.image = resp.data.image;
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                });
            };

            // // Get a single image

            // vm.singleImage = ((id) => {
            //     let getSingleImage = API.getSingleImage(id);
            //     getSingleImage.then(res => {
            //         console.log(res);
            //         vm.currentImage = res.data;
            //         $('#myUserModal').modal('show')

            //     })
            // })

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
