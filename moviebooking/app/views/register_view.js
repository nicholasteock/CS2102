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
		return false;
	}

	return true;
};

var registerSubmit = function() {
	var email 		= $("#register-email").val(),
		name 		= $("#register-name").val(),
		password 	= $("#register-password").val(),
		params 		= {
						email 		: email,
						name 		: name,
						password 	: password
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
				window.location.hash = "#listing";
				window.location.hash = "#listing";
				return false;
			},
			error		: function(response) {
				alert("Error in registering user.");
			}
	});
};

var afterRender = function() {
	console.log("In register page");
	$(".register-submit").click(registerSubmit);
};


module.exports = View.extend({
    id: 'register-view',
    events: events,
    afterRender: afterRender,
    template: template,
})
