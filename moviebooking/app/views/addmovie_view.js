var View     = require('./view'),
	template = require('./templates/addmovie');

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}
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

var addmovie = function(ev) {

	var title 		= $("#addmovie-title").val(),
		rating 		= $("#addmovie-rating").val(),
		director 	= $("#addmovie-director").val(),
		cast 		= $("#addmovie-cast").val(),
		genre 		= $("#addmovie-genre").val(),
		runtime 	= $("#addmovie-runtime").val(),
		mdarating 	= $("#addmovie-mdarating").val(),
		languages 	= $("#addmovie-languages").val(),
		subtitles 	= $("#addmovie-subtitles").val(),
		synopsis 	= $("#addmovie-synopsis").val(),
		params 		= {
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
			url 		: Application.api+"addmovie",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				alert("Movie "+params.title+" has been updated.");
				return false;
			},
			error		: function(response) {
				alert("Error in add movie "+params.title);
			}
	});
};

var validate = function(params) {

	$(".addmovie-error").html("");

	if(	params.title.length==0 ||
		params.rating.length==0 ||
		params.director.length==0 ||
		params.cast.length==0 ||
		params.runtime.length==0
	) {
		$(".addmovie-error").html("*All fields are required.");
		return false;
	}

	if(params.runtime <= 0) {
		$(".addmovie-error").html("Movie runtime cannot be 0");
		return false;
	}

	if(params.rating > 10 || params.rating < 0) {
		$(".addmovie-error").html("Rating is between 0-10");
		return false;
	}

	return true;
};

var editcancel = function() {
	Application.router.navigate('admin', {trigger: true});
};

var afterRender = function() {
	$(".loadingSpinner").addClass("hide");
	$(".addmovie-panel").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".addmovie-submit").click(addmovie);
	$(".addmovie-cancel").click(editcancel);
}

module.exports = View.extend({
    id 				: 'addmovie-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});
