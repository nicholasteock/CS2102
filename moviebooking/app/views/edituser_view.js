var View     = require('./view'),
	template = require('./templates/edituser');

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
			url 		: Application.api+"userinfo",
			type 		: "POST",
			dataType	: 'json',
			data 		: data,
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


var edituser = function(ev) {
	var userId 		= ev.target.id,
		email 		= $("#edituser-email").val(),
		name 		= $("#edituser-name").val(),
		password 	= $("#edituser-password").val(),
		isAdmin 	= $('#edituser-isadmin').is(":checked") ? 0 : 1,
		params 		= {
						userId 		: userId,
						email 		: email,
						name 		: name,
						password 	: password,
						userType 	: isAdmin
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"edituser",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				alert("User "+params.name+" has been updated.");
				return false;
			},
			error		: function(response) {
				alert("Error in edit user "+params.name);
			}
	});
};

var validate = function(params) {
	var email 		= params.email,
		name 		= params.name,
		password 	= params.password;

	$(".edituser-error").html("");

	if(email.length==0 || name.length==0 || password.length==0) {
		$(".edituser-error").html("*All fields are required.");
		return false;
	}

	return true;
};

var editcancel = function() {
	Application.router.navigate('admin', {trigger: true});
};

var afterRender = function() {
	$(".loadingSpinner").addClass("hide");
	$(".edituser-panel").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	// $(".editpanel").click(editpanel);
	$(".edituser-submit").click(edituser);
	$(".edituser-cancel").click(editcancel);
};

module.exports = View.extend({
    id 				: 'edituser-view',
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});
