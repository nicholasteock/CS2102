var View     = require('./view'),
	template = require('./templates/admin');

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
		return dfdResult.resolve( response.data );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response.data );
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

var adminnav = function(ev) {
	var id = ev.target.id;
	$(".admin-nav ul li").removeClass("active");
	$("#"+id).parent().addClass("active");

	switch (id) {
		case "admin-users":
			$(".admin-management").addClass("hide");
			$(".users-management").removeClass("hide");
			break;
		case "admin-bookings":
			$(".admin-management").addClass("hide");
			$(".bookings-management").removeClass("hide");
			break;
		case "admin-movies":
			$(".admin-management").addClass("hide");
			$(".movies-management").removeClass("hide");
			break;
		case "admin-showtimes":
			$(".admin-management").addClass("hide");
			$(".showtimes-management").removeClass("hide");
			break;
		default:
			break;
	}
};

var adduser = function() {
	Application.router.navigate('adduser', {trigger: true});
	return false;
};

var addmovie = function() {
	Application.router.navigate('addmovie', {trigger: true});
	return false;
};

var edituser = function(ev) {
	var temp 	= ev.target.id;
		userId 	= temp.substring(9);

	Application.router.navigate('edituser?userId='+userId, {trigger: true});
};

var editmovie = function(ev) {
	var temp 	= ev.target.id;
		mid 	= temp.substring(10);

	Application.router.navigate('editmovie?mid='+mid, {trigger: true});
};

var removeuser = function(ev) {
	var temp 		= ev.target.id,
		userId 		= temp.substring(11);
		params 		= { userId: userId };

	$.ajax({
			url 		: Application.api+"removeuser",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(ev.target).parent().parent().remove();
				return;
			},
			error		: function(response) {
				console.log("Error in removeuser, response :", response);
				return;
			}
	});
}

var editbooking = function() {
	
}

var removebooking = function(ev) {
	var temp 		= ev.target.id,
		ticketnum 	= temp.substring(14);
		params 		= { ticketnum: ticketnum };

	$.ajax({
			url 		: Application.api+"removebooking",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(ev.target).parent().parent().remove();
				return;
			},
			error		: function(response) {
				console.log("Error in removebooking, response :", response);
				return;
			}
	});
};

var afterRender = function(){
	$(".loadingSpinner").addClass("hide");
	$(".users-management").removeClass("hide");
	$(".logout").click(logout);
	$(".adminpanel").click(adminpanel);
	$(".admin-nav li").click(adminnav);
	$(".adduser").click(adduser);
	$(".addmovie").click(addmovie);
	$(".edituser").click(edituser);
	$(".editmovie").click(editmovie);
	$(".removeuser").click(removeuser);
	$(".editbooking").click(editbooking);
	$(".removebooking").click(removebooking);
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
