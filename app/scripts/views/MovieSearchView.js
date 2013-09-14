'use strict';

/*global cinephile, Backbone, JST*/

cinephile.Views.MovieSearchView = Backbone.View.extend({
    
    tagName: 'li',
    
    className: 'movie row-fluid',
    
    template: JST['app/scripts/templates/MovieSearchView.ejs'],
    
    events :
    {
        'click a' : 'addToFavourites'
    },

    initialize: function()
    {
        this.render();
    },
    
    render : function()
    {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    
    addToFavourites: function()
    {
        $('.dropdown').removeClass('open');
        
        var movieDetails = new cinephile.Models.MovieDetailsModel({id : this.model.get('id')});
        movieDetails.fetch({
            success: function(movie)
            {
                Backbone.trigger('favMovies:added', movie);
            }
        });
    }
    
});
