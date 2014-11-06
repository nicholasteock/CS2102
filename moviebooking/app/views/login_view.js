var View     = require('./view')
  , template = require('./templates/login')

var events = {
	// 'click .login-submit': 'login'
};

var afterRender = function() {
	console.log("In login page");
	localStorage.removeItem("booking");

	if(localStorage.userId != undefined && localStorage.name != undefined) {
		Application.router.navigate('listing', {trigger: true});
		return false;
	}

	$(".login-submit").click(login);
	$(".login-register").click(register);
};

var login = function() {
	var email 		= $("#login-email").val(),
		password 	= $("#login-password").val(),
		params 		= {
						email 		: email,
						password 	: password
					};

	$(".login-error").html("");

	if(email.length === 0) {
		$(".login-error").html("*All fields are required.");
		return;
	}

	if(password.length === 0) {
		$(".login-error").html("*All fields are required.");
		return;
	}

	$.ajax({
			url 		: Application.api+"login",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				if(response.data == undefined || response.data.length === 0) {
					$(".login-error").html("Invalid credentials. Please try again.");
				}
				else {
					$(".login-error").html("");
					localStorage.userId 	= response.data[0].userId;
					localStorage.name 		= response.data[0].name;
					// window.location.hash 	= "#listing";
					// window.location.hash 	= "#listing";
					Application.router.navigate('listing', {trigger: true});
				}
				return false;
			},
			error		: function(response) {
				alert("Error in login user.");
			}
	});

	// Application.router.navigate('listing', {trigger: true});
	return;
};

var register = function() {
	window.location.hash = "#register";
};

module.exports = View.extend({
    id: 'login-view',
    events: events,
    afterRender: afterRender,
    template: template,
    login: login
})
