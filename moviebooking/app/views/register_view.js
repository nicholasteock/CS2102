var View     = require('./view')
  , template = require('./templates/register')

var events = {
};

var getRenderData

var validate = function(params) {
	var email 		= params.email,
		name 		= params.name,
		password 	= params.password;

	$(".register-error").html("");

	if(email.length==0 || name.length==0 || password.length==0) {
		$(".register-error").html("*All fields are required.");
		$(".loginSpinner").addClass("hide");
		$(".register-submit").removeClass("hide");
		return false;
	}

	return true;
};

var registerSubmit = function() {
	$(".loginSpinner").removeClass("hide");
	$(".register-submit").addClass("hide");

	var email 		= $("#register-email").val(),
		name 		= $("#register-name").val(),
		password 	= $("#register-password").val(),
		params 		= {
						email 		: email,
						name 		: name,
						password 	: password,
						userType 	: "1"
					};

	if(!validate(params)) return;

	$.ajax({
			url 		: Application.api+"register",
			type 		: "POST",
			dataType	: 'json',
			data 		: params,
			success		: function(response) {
				localStorage.userId = response.data[0].userId;
				localStorage.name 	= response.data[0].name;
				Application.router.navigate('listing', {trigger: true});
				return false;
			},
			error		: function(response) {
				alert("Error in registering user.");
				$(".loginSpinner").addClass("hide");
				$(".register-submit").removeClass("hide");
			}
	});
};

var registerCancel = function() {
	Application.router.navigate('login', {trigger: true});
};

var afterRender = function() {
	console.log("In register page");
	$(".register-submit").click(registerSubmit);
	$(".register-cancel").click(registerCancel);
};


module.exports = View.extend({
    id: 'register-view',
    events: events,
    afterRender: afterRender,
    template: template,
})
