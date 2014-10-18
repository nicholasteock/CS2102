var View     = require('./view')
  , template = require('./templates/movie')

module.exports = View.extend({
    id: 'movie-view',
    template: template
})
