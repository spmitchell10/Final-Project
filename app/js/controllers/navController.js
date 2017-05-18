(function() {
    'use strict';

    angular
        .module('familyshare')
        .controller('navController', function(API) {


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

        })
})();
