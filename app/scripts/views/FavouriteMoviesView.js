'use strict';

/*global cinephile, Backbone, JST, _*/

cinephile.Views.FavouriteMoviesView = Backbone.View.extend({
    
    template: JST['app/scripts/templates/FavouriteMoviesView.ejs'],
    
    events:
    {
        'change #filter' : 'setFilter'
    },

    initialize: function()
    {
        this.collection.fetch();
        this.listenTo(this.collection, 'add', this.addMovie);
        
        //_.bindAll(this, 'setFilter');
        this.activeFilter = '';
        
        this.render();
    },
    
    render: function()
    {
        this.$el.html(this.template());
        
        if(this.collection.isEmpty())
        {
            this.$el.html($('#no-favourites').html());
        }
        else
        {
            this.renderFavourites();
        }
       
        return this;
    },
    
    renderFavourites: function()
    {
        this.$('#favourites').html('');
        
        var filteredMovies;
        
        switch (this.activeFilter)
        {
        case 'watched':
        
            filteredMovies = this.collection.where({watched: true});
            break;
        
        case 'unwatched':
        
            filteredMovies = this.collection.where({watched: false});
            break;
        
        default:
        
            filteredMovies = this.collection.models;
            break;
        }
        
        var instance = this;
        _.each(filteredMovies, function(element)
        {
            var view = new cinephile.Views.MovieView({model: element});
            instance.$('#favourites').append(view.el);
        });
    },
    
    addMovie: function(movie)
    {
        if(this.collection.length === 1)
        {
            this.render();
        }
        else
        {
            var view = new cinephile.Views.MovieView({model: movie});
            this.$('#favourites').append(view.el);
        }
    },
    
    setFilter: function()
    {
        this.activeFilter = $('#filter').val();
        this.renderFavourites();
    }

});
