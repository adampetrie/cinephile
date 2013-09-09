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

    $.ajax({
        type: 'get',
        url: '/cinephile/api/index.php?action=configuration',
        dataType: 'JSON',
        success: function(data)
        {
            tmdbBaseUrl = data.images.base_url;
            tmdbPosterSizes = data.images.poster_sizes;
            
            console.log(tmdbPosterSizes);
            
            cinephile.init();
        },
        error: function(event)
        {
            console.log(event);
        }
    });
});
