// Application bootstrapper.
Application = {
    initialize: function() {

        var ConfirmationView 	    = require('views/confirmation_view'),
            LoginView               = require('views/login_view'),
        	RegisterView 		    = require('views/register_view'),
        	ListingView 		    = require('views/listing_view'),
        	MovieView 			    = require('views/movie_view'),
            BookingView             = require('views/booking_view'),
            EditView                = require('views/edit_view'),
            AdminView               = require('views/admin_view'),
            BookingmanagementView   = require('views/bookingmanagement_view'),
            EditbookingView         = require('views/editbooking_view'),
            AdduserView             = require('views/adduser_view'),
            EdituserView            = require('views/edituser_view'),
            AddmovieView            = require('views/addmovie_view'),
        	EditmovieView 		    = require('views/editmovie_view'),
            Router   			    = require('lib/router');
        
        this.api                    = "http://ec2-54-69-16-201.us-west-2.compute.amazonaws.com/api/";

        this.confirmationView 	    = new ConfirmationView();
        this.loginView              = new LoginView();
        this.registerView 		    = new RegisterView();
        this.listingView 		    = new ListingView();
        this.movieView 			    = new MovieView();
        this.bookingView            = new BookingView();
        this.editView               = new EditView();
        this.adminView              = new AdminView();
        this.bookingmanagementView  = new BookingmanagementView();
        this.editbookingView        = new EditbookingView();
        this.adduserView            = new AdduserView();
        this.edituserView           = new EdituserView();
        this.addmovieView           = new AddmovieView();
        this.editmovieView 		    = new EditmovieView();
        this.router   			    = new Router();
                
        if (typeof Object.freeze === 'function') Object.freeze(this)
        
    }
}

module.exports = Application
