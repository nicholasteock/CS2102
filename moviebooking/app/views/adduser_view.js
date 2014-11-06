var View     = require('./view'),
	template = require('./templates/adduser')

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
};

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('userType');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var validate = function(params) {
	var email 		= params.email,
		name 		= params.name,
		password 	= params.password;

	$(".newuser-error").html("");

	if(email.length==0 || name.length==0 || password.length==0) {
		$(".newuser-error").html("*All fields are required.");
		return false;
	}

	return true;
};

var newuser = function() {
	var email 		= $("#newuser-email").val(),
		name 		= $("#newuser-name").val(),
		password 	= $("#newuser-password").val(),
		isAdmin 	= $('#check_id').is(":checked") ? 0 : 1,
		params 		= {
						email 		: email,
						name 		: name,
						password 	: password,
						userType 	: isAdmin
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"register",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				$(".newuser-error").html("New user "+params.name+" added to system.");
				$("#newuser-email").val(""),
				$("#newuser-name").val(""),
				$("#newuser-password").val(""),
				return false;
			},
			error		: function(response) {
				alert("Error in registering user "+params.name);
			}
	});
};

var afterRender = function(){
	$(".logout").click(logout);
	$(".newuser-submit").click(newuser);
};

var events = {
};

module.exports = View.extend({
    id 				: 'adduser-view',
    events 			: events,
    getRenderData 	: getRenderData,
    afterRender 	: afterRender,
    template 		: template,
    newuser 		: newuser
});
