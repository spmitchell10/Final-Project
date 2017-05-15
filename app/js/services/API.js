(function() {
    'use strict';

    angular
        .module('familyshare')
        .factory('API', function($http){


			return {


			    postImages:(data)=>{
			    	return $http({
					         method:"POST",
                   data,
	                 url: `http://localhost:3000/pictures`,
                  })
				   },


			    addImage:(data)=>{
                    return $http({
	                    method:"POST",
	                    url: " http://localhost:3000/vidupload",
	                    data: data,
                   })
			     },

			   //  getSingleImage:(id) => {
      //                  return $http({
      //                       method:"GET",
      //                       url: ``,
      //                       headers:{X_CSRF_TOKEN: 'stephen'},
      //                  })
      //              },

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