var View     = require('./view'),
	template = require('./templates/admin')

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	if(localStorage.userType == undefined || localStorage.userType != 0) {
		alert("You do not have admin privileges.");
		Application.router.navigate('listing', {trigger: true});
		return false;
	}

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response );
	};

	$.ajax({
			url 		: Application.api+"admininfo",
			type 		: "POST",
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

var adduser = function() {
	Application.router.navigate('adduser', {trigger: true});
	return false;
};

var addmovie = function() {
	Application.router.navigate('addmovie', {trigger: true});
	return false;
};

var afterRender = function(){
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".adduser").click(adduser);
	$(".addmovie").click(addmovie);
};

var events = {
};

module.exports = View.extend({
    id 				: 'admin-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});
