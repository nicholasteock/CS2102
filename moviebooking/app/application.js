// Application bootstrapper.
Application = {
    initialize: function() {
        
        var HomeView 		= require('views/home_view'),
        	LoginView 		= require('views/login_view'),
        	ListingView 	= require('views/listing_view'),
        	MovieView 		= require('views/movie_view'),
        	BookingView 	= require('views/booking_view')
        	Router   		= require('lib/router');
        
        this.homeView 		= new HomeView();
        this.loginView 		= new LoginView();
        this.listingView 	= new ListingView();
        this.movieView 		= new MovieView();
        this.bookingView 	= new BookingView();
        this.router   		= new Router();
        
        if (typeof Object.freeze === 'function') Object.freeze(this)
        
    }
}

module.exports = Application
