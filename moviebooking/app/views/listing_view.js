var View     = require('./view')
  , template = require('./templates/listing')

module.exports = View.extend({
    id: 'listing-view',
    template: template
})
