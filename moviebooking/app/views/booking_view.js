var View     = require('./view')
  , template = require('./templates/booking');



var afterRender = function() {
};

module.exports = View.extend({
    id: 'booking-view',
    afterRender: afterRender,
    template: template
})
