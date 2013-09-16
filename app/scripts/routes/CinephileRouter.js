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
        console.log('Home Route');
        
        //Because homeView is static, there's no need to re-initialize it 
        if ( ! this.homeView)
        {
            this.homeView = new cinephile.Views.HomeView();
        }
        $('#content').html(this.homeView.el);
        
    },
    
    favourites: function()
    {
        console.log('Favourites Route');
        
        var favMoviesView = new cinephile.Views.FavouriteMoviesView({
            collection: cinephile.favouriteMovies
        });
        $('#content').html(favMoviesView.el);
    },

    details: function(id)
    {
        console.log('Details Route');
        
        var movieInCollection = cinephile.favouriteMovies.get(id);
        
        //If the selected ID is in the favourites collection, we already have all the data
        //we need to render its details properly.
        if(typeof movieInCollection !== 'undefined')
        {
            var view = new cinephile.Views.MovieDetailsView({
                model: movieInCollection,
                inFavourites: true
            });
            
            $('#content').html(view.el);
        }
        //ID's not in favourites are requested from the server before being rendered
        else
        {
            var movieDetails = new cinephile.Models.MovieDetailsModel({ id: id });
            movieDetails.fetch({
                success: function(movie)
                {
                    var view = new cinephile.Views.MovieDetailsView({
                        model: movie,
                        inFavourites: false
                    });
                    
                    $('#content').html(view.el);
                }
            });
        }
    }
});
