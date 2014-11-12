var View     = require('./view'),
	template = require('./templates/editmovie');

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response );
	};

	var onError = function( response ) {
		return dfdResult.reject( response );
	};

	var data 		= {};
	var hash 		= window.location.hash;
	var filter 		= hash.substring(hash.indexOf("?")+1);
	var filterArr 	= filter.split("=");
	data[filterArr[0]] = filterArr[1];

	$.ajax({
			url 		: Application.api+"movie?mid="+filterArr[1],
			type 		: "GET",
			dataType	: 'json',
			success		: onSuccess,
			error		: onError
	});

	return dfdResult;
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var adminpanel = function() {
	Application.router.navigate('admin', {trigger: true});
	return false;
};


var editmovie = function(ev) {

	var mid 		= ev.target.id,
		title 		= $("#editmovie-title").val(),
		rating 		= $("#editmovie-rating").val(),
		director 	= $("#editmovie-director").val(),
		cast 		= $("#editmovie-cast").val(),
		genre 		= $("#editmovie-genre").val(),
		runtime 	= $("#editmovie-runtime").val(),
		mdarating 	= $("#editmovie-mdarating").val(),
		languages 	= $("#editmovie-languages").val(),
		subtitles 	= $("#editmovie-subtitles").val(),
		synopsis 	= $("#editmovie-synopsis").val(),
		params 		= {
						mid 		: mid,
						title 		: title,
						rating 		: rating,
						director 	: director,
						cast 		: cast,
						genre 		: genre,
						runtime 	: runtime,
						mdarating 	: mdarating,
						languages	: languages,
						subtitles 	: subtitles,
						synopsis 	: synopsis,
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"editmovie",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				alert("Movie "+params.title+" has been updated.");
				return false;
			},
			error		: function(response) {
				alert("Error in edit movie "+params.name);
			}
	});
};

var validate = function(params) {

	$(".editmovie-error").html("");

	if(	params.title.length==0 ||
		params.rating.length==0 ||
		params.director.length==0 ||
		params.cast.length==0 ||
		params.runtime.length==0
	) {
		$(".editmovie-error").html("*All fields are required.");
		return false;
	}

	if(params.runtime <= 0) {
		$(".editmovie-error").html("Movie runtime cannot be 0");
		return false;
	}

	if(params.rating > 10 || params.rating < 0) {
		$(".editmovie-error").html("Rating is between 0-10");
		return false;
	}

	return true;
};

var editcancel = function() {
	Application.router.navigate('admin', {trigger: true});
};

var afterRender = function() {
	$(".loadingSpinner").addClass("hide");
	$(".editmovie-panel").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".editpanel").click(editpanel);
	$(".editmovie-submit").click(editmovie);
	$(".editmovie-cancel").click(editcancel);
}

module.exports = View.extend({
    id 				: 'editmovie-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});
