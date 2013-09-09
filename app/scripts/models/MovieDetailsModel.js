'use strict';

/*global cinephile, Backbone*/

cinephile.Models.MovieDetailsModel = Backbone.Model.extend({
    
    defaults:
    {
        watched: false
    },
    
    url: function()
    {
        return '/cinephile/api/index.php?action=getMovieDetails&movieId=' + this.id;
    },
    
    toggleWatched: function()
    {
        this.set({'watched' : ! this.get('watched')});
        this.save();
    }
});