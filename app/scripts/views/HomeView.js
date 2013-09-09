'use strict';

/*global cinephile, Backbone, JST*/

cinephile.Views.HomeView = Backbone.View.extend({

    template: JST['app/scripts/templates/HomeView.ejs'],
    
    initialize: function()
    {
        this.render();
    },
    
    render : function()
    {
        this.$el.html(this.template());
        return this;
    }
});
