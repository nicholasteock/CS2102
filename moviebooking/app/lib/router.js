var application = require('application')

module.exports 	= Backbone.Router.extend({
    routes: {
        '' 				: 'login',
        'login' 		: 'login',
        'listing' 		: 'listing',
        'movie' 		: 'movie',
        'booking' 		: 'booking',
        'confirmation' 	: 'confirmation',
    },
    
    login: function() {
        $('body').html(application.loginView.render().el)
    },
    
    listing: function() {
        $('body').html(application.listingView.render().el)
    },
    
    movie: function() {
        $('body').html(application.movieView.render().el)
    },
    
    booking: function() {
        $('body').html(application.bookingView.render().el)
    },
    
    confirmation: function() {
        $('body').html(application.confirmationView.render().el)
    },

})
