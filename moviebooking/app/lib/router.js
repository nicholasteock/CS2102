var application = require('application')

module.exports 	= Backbone.Router.extend({
    routes: {
        '' 				    : 'login',
        'login'             : 'login',
        'register' 		    : 'register',
        'listing' 		    : 'listing',
        'movie' 		    : 'movie',
        'booking' 		    : 'booking',
        'confirmation' 	    : 'confirmation',
        'edit'              : 'edit',
        'admin'             : 'admin',
        'bookingmanagement' : 'bookingmanagement',
        'editbooking'       : 'editbooking',
        'adduser'           : 'adduser',
        'edituser'          : 'edituser',
        'addmovie'          : 'addmovie',
        'editmovie'         : 'editmovie'
    },
    
    login: function() {
        $('body').html(application.loginView.render())
    },

    register: function() {
        $('body').html(application.registerView.render())
    },
    
    listing: function() {
        $('body').html(application.listingView.render())
    },
    
    movie: function() {
        $('body').html(application.movieView.render())
    },
    
    booking: function() {
        $('body').html(application.bookingView.render())
    },
    
    confirmation: function() {
        $('body').html(application.confirmationView.render())
    },

    edit: function() {
        $('body').html(application.editView.render())
    },

    admin: function() {
        $('body').html(application.adminView.render())
    },

    bookingmanagement: function() {
        $('body').html(application.bookingmanagementView.render())
    },

    editbooking: function() {
        $('body').html(application.editbookingView.render())
    },

    adduser: function() {
        $('body').html(application.adduserView.render())
    },

    edituser: function() {
        $('body').html(application.edituserView.render())
    },

    addmovie: function() {
        $('body').html(application.addmovieView.render())
    },

    editmovie: function() {
        $('body').html(application.editmovieView.render())
    },
})
