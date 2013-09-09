'use strict';

/*global cinephile, Backbone, JST*/

cinephile.Views.HeaderView = Backbone.View.extend({

    el: $('#header'),
    
    template: JST['app/scripts/templates/HeaderView.ejs'],
    
    initialize: function()
    {
        this.render();
    },
    
    render: function ()
    {
        this.$el.html(this.template());
        
        this.searchView = new cinephile.Views.SearchView();
        return this;
    }
});
