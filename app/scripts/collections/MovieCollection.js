'use strict';

/*global cinephile, Backbone*/

cinephile.Collections.MovieCollection = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage('cinephile'),
    
    initialize: function()
    {
        this.model = cinephile.Models.MovieDetailsModel;
        
        var instance = this;
        Backbone.on('favMovies:added', function(movie)
        {
            instance.add(movie);
            movie.save();
        });
    }
});
