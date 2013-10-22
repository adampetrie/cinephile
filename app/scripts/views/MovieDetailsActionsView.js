'use strict';

/*global cinephile, Backbone, JST */

cinephile.Views.MovieDetailsActionsView = Backbone.View.extend({

    template: JST['app/scripts/templates/MovieDetailsActions.ejs'],
    
    events:
    {
        'click a#add' : 'addToFavourites',
        'click a#remove' : 'removeFromFavourites',
        'click a#watched' : 'toggleWatched'
    },
    
    initialize: function()
    {
        this.listenTo(this.model, 'change', this.render);
        
        this.render();
    },
    
    render : function()
    {
        this.$el.html(this.template({
            inFavourites: this.options.inFavourites,
            watched: this.model.get('watched')
        }));
        return this;
    },
    
    addToFavourites: function()
    {
        Backbone.trigger('favMovies:added', this.model);
        this.options.inFavourites = true;
        this.render();
    },
    
    removeFromFavourites: function()
    {
        this.model.destroy();
        this.options.inFavourites = false;
        this.render();
    },
    
    toggleWatched: function()
    {
        this.model.toggleWatched();
    },
    
    close: function()
    {
        this.remove();
    }
});
