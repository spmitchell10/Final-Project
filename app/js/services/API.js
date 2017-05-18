(function() {
    'use strict';

    angular
        .module('familyshare')
        .factory('API', function($http){


			return {


			    getImages:()=>{
        			         return $http({
        					         method:"GET",
        	                 url: `http://localhost:3000/picupload`,
                          })
				   },


			    addImage:(data)=>{
                       return $http({
      	                    method:"POST",
      	                    url: "http://localhost:3000/picupload",
      	                    data: data,
                         })
			     },

           addComment:(data)=>{
                       return $http({
                            method:"POST",
                            url: "http://localhost:3000/comment",
                            data: data,
                         })
           },

           addAlbum:(data)=>{
                       return $http({
                            method:"POST",
                            url: "http://localhost:3000/album",
                            data: data,
                         })
           },

           getAlbum:(id)=>{
                       return $http({
                           method:"GET",
                           url: `http://localhost:3000/album/${id}`,
                          })
           },

           getAlbums:()=>{
                       return $http({
                           method:"GET",
                           url: `http://localhost:3000/album/`,
                          })
           },

			     getSingleImage:(id) => {
                       return $http({
                            method:"GET",
                            url: `http://localhost:3000/pic/${id}`,
                       })
                   },

      //     likeImage:(data) => {
      //            return $http({
      //                 method:"POST",
      //                 url: "",
      //                 data: {imageid:data},
      //            })
      //        }
			    
		  	};
        });
})();