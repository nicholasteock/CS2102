require('lib/view_helper')

// Base class for all views
module.exports = Backbone.View.extend({
    
    initialize: function(){
        this.render = _.bind(this.render, this)
    },
    
    template: function(){},
    getRenderData: function(){},
    
    render: function(){
        var that = this;

        $.when(this.getRenderData()).done(
            function(data){
                $("body").html(that.template(data));
                that.afterRender();
                return that;
        }).fail(
            function(data){
                $("body").html(this.template(data));
                that.afterRender();
                return that;
        });


        // this.$el.html(this.template(this.getRenderData()));
        // this.afterRender();
        // return this;
    },
    
    afterRender: function(){}
    
})
