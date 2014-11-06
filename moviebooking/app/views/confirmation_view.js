var View     = require('./view'),
	template = require('./templates/confirmation');

var getRenderData = function() {
	if(localStorage.userId == undefined || localStorage.name == undefined) {
		alert("Please log in to continue");
		Application.router.navigate('login', {trigger: true});
		return false;
	}
}

var logout = function() {
	localStorage.removeItem('userId');
	localStorage.removeItem('name');
	localStorage.removeItem('booking');
	Application.router.navigate('login', {trigger: true});
	return false;
};

var afterRender = function() {
	$(".logout").click(logout);
}

module.exports = View.extend({
    id: 'confirmation-view',
    template: template,
    getRenderData : getRenderData,
    afterRender: afterRender
});
