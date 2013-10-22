'use strict';

/*global cinephile, Backbone*/

cinephile.Routers.CinephileRouter = Backbone.Router.extend({
    
    routes:
    {
        '' : 'home',
        'favourites' : 'favourites',
        'details/:id' : 'details'
    },
    
    initialize: function()
    {
        new cinephile.Views.SearchView();
        
        this.on('route', function(route)
        {
            $('#top-nav li').removeClass('active');
            $('#nav-' + route).addClass('active');
        });
    },
    
    home: function()
    {
        //Because homeView is static, there's no need to re-initialize it 
        if ( ! this.homeView)
        {
            this.homeView = new cinephile.Views.HomeView();
        }
        $('#content').html(this.homeView.el);
    },
    
    favourites: function()
    {
        //Again, dont re-initialize the favourites view as there is no need.
        //Instead, just render the favourite movies
        if ( ! this.favMoviesView)
        {
            this.favMoviesView = new cinephile.Views.FavouriteMoviesView({
                collection: cinephile.favouriteMovies
            });
        }
        else
        {
            this.favMoviesView.renderFavourites();
        }
        
        $('#content').html(this.favMoviesView.el);
    },

    details: function(id)
    {
        // Clean up the existing details view (if one exists)
        if (this.detailsView)
        {
            this.detailsView.close();
        }
        
        var movieInCollection = cinephile.favouriteMovies.get(id);
        
        //If the selected ID is in the favourites collection, we already have all the data
        //we need to render its details properly.
        if(typeof movieInCollection !== 'undefined')
        {
            this.detailsView = new cinephile.Views.MovieDetailsView({
                model: movieInCollection,
                inFavourites: true
            });
            
            $('#content').html(this.detailsView.el);
        }
        //ID's not in favourites are requested from the server before being rendered
        else
        {
            var instance = this;
            var movieDetails = new cinephile.Models.MovieDetailsModel({ id: id });
            movieDetails.fetch({
                success: function(movie)
                {
                    instance.detailsView = new cinephile.Views.MovieDetailsView({
                        model: movie,
                        inFavourites: false
                    });
                    
                    $('#content').html(instance.detailsView.el);
                }
            });
        }
    }
});
