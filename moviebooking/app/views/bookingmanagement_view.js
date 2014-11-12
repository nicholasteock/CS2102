var View     = require('./view'),
	template = require('./templates/bookingmanagement');

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}

	var	dfdResult = $.Deferred();

	var onSuccess = function( response ) {
		return dfdResult.resolve( response.data );
	};
	
	var onError = function( response ) {
		return dfdResult.reject( response.data );
	};

	var params = { userId : localStorage.userId };

	$.ajax({
			url 		: Application.api+"userbookings",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
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

var editpanel = function() {
	Application.router.navigate('bookingmanagement', {trigger: true});
	return false;
};

var editbooking = function(ev) {
	var temp 		= ev.target.id,
		ticketnum 	= temp.substring(12);

	Application.router.navigate('editbooking?tid='+ticketnum, {trigger: true});
};

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
	$(".logout").click(logout);
	$(".editbooking").click(editbooking);
	$(".removebooking").click(removebooking);
};

var events = {
};

module.exports = View.extend({
    id 				: 'bookingmanagement-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template
});
