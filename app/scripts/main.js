'use strict';

/*global cinephile, $, Backbone*/

var tmdbBaseUrl = '';
var tmdbPosterSizes = [];

window.cinephile = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function()
    {
        //Initialize the favourites collection and pull any favourites out of
        //localStorage
        this.favouriteMovies = new this.Collections.MovieCollection({
            model: this.Models.MovieDetailsModel
        });
        
        this.favouriteMovies.fetch({
            success: function()
            {
                new cinephile.Routers.CinephileRouter();
                Backbone.history.start();
            }
        });
    }
};

$(document).ready(function(){

    //TMDb API requires a call to configuration in order to get the data required
    //for image urls. We make this call once on page load and make the necessary
    //values globally available.
    $.ajax({
        type: 'get',
        url: '/cinephile/api/index.php?action=configuration',
        dataType: 'JSON',
        success: function(data)
        {
            tmdbBaseUrl = data.images.base_url;
            tmdbPosterSizes = data.images.poster_sizes;
        },
        error: function()
        {
            $('#header').after($('#no-connection').html());
        },
        complete: function()
        {
            //Start the app
            cinephile.init();
        }
    });
});
