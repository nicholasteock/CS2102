// Application bootstrapper.
Application = {
    initialize: function() {

        var ConfirmationView 	= require('views/confirmation_view'),
            LoginView           = require('views/login_view'),
        	RegisterView 		= require('views/register_view'),
        	ListingView 		= require('views/listing_view'),
        	MovieView 			= require('views/movie_view'),
            BookingView         = require('views/booking_view')
        	EditView 		    = require('views/edit_view')
        	Router   			= require('lib/router');
        
        this.api                = "http://ec2-54-69-16-201.us-west-2.compute.amazonaws.com/api/";

        this.confirmationView 	= new ConfirmationView();
        this.loginView          = new LoginView();
        this.registerView 		= new RegisterView();
        this.listingView 		= new ListingView();
        this.movieView 			= new MovieView();
        this.bookingView        = new BookingView();
        this.editView 		    = new EditView();
        this.router   			= new Router();
                
        if (typeof Object.freeze === 'function') Object.freeze(this)
        
    }
}

module.exports = Application
