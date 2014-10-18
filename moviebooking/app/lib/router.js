var application = require('application')

module.exports 	= Backbone.Router.extend({
    routes: {
        '' 			: 'login',
        'login' 	: 'login',
        'listing' 	: 'listing',
        'movie' 	: 'movie',
        'booking' 	: 'booking',
        'home' 		: 'home',
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
    
    home: function() {
        $('body').html(application.homeView.render().el)
    },

})
