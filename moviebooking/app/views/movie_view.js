var View     = require('./view')
  , template = require('./templates/movie')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var hash 		= window.location.hash,
		temp 		= hash.indexOf('?id='),
		mid 		= hash.substring(temp+4),
		params 		= {id: mid},
		responseObj = {};
	
	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		var showtimes = response.data;

		$.ajax({
	        url       : Application.api+"movie?mid="+mid,
	        type      : "GET",
	        dataType  : 'json',
	        success   : function(response) {
				var details = response.data;
				responseObj.details  	= details[0];
				responseObj.showtimes = showtimes;
				console.log("responseObj", responseObj);
				return dfdResult.resolve( responseObj );
	        },
	        error     : function(response) {
	          console.log("Error in ajax call.");
	          return dfdResult.reject( responseObj );
	        }
	    });
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response );
	};
	
	$.ajax({
			url 		: Application.api+"showtimes?id="+mid,
			type 		: "GET",
			dataType	: 'json',
			success		: onSuccess,
			error		: onError
	});
	
	return dfdResult;
};

var afterRender = function() {
	$(".logout").click(logout);
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

module.exports = View.extend({
    id 				: 'movie-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});
