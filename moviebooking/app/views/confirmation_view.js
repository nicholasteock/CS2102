var View     = require('./view'),
	template = require('./templates/confirmation');

module.exports = View.extend({
    id: 'confirmation-view',
    afterRender: afterRender,
    template: template,
});
