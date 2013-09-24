'use strict';

/*global cinephile, Backbone, _*/

cinephile.Views.SearchView = Backbone.View.extend({
    
    el: '#search-results',
    
    events:
    {
        'submit': 'movieSearch'
    },
    
    initialize: function()
    {
        //Stores last search to save uneccesary server requests
        this.lastQuery = '';
        
        this.collection = new Backbone.Collection();
        
        this.listenTo(this.collection, 'reset', this.showSearchResults);
    },
    
    movieSearch: function(event)
    {
        //Prevent the browser from refreshing
        event.preventDefault();
        
        var query = this.$('#movie-title').val().trim();
        
        //If the queries are the same, just show the same results, no need to request them
        //again.
        if(this.lastQuery === query)
        {
            this.$el.addClass('open');
        }
        else
        {
            //If we are getting results from the server, update the lastQuery so we can compare
            //the next search
            this.lastQuery = query;
            
            var instance = this;
            
            $.ajax({
                type: 'get',
                url: '/cinephile/api/index.php?action=searchMovies&title=' + query,
                dataType: 'JSON',
                success: function(data)
                {
                    //If the result set isn't empty show the results
                    if (_.size(data.results) > 0)
                    {
                        instance.collection.reset(data.results);
                    }
                    //Otherwise show a 'no results' message
                    else
                    {
                        instance.noResultsFound();
                    }
                },
                error: function(event)
                {
                    console.log(event);
                }
            });
        }
    },
    
    showSearchResults: function()
    {
        this.clearSearchResults();
        
        var instance = this;
        _.each(this.collection.models, function(element)
        {
            var view = new cinephile.Views.MovieSearchView({model: element});
            instance.$('.dropdown-menu').append(view.el);
        });
        
        this.$el.addClass('open');
    },
    
    clearSearchResults: function()
    {
        this.$('.dropdown-menu').html('');
    },
    
    noResultsFound: function()
    {
        var template = _.template($('#no-results').html(), { query : this.lastQuery } );
        this.$('.dropdown-menu').html(template);
        this.$el.addClass('open');
    }
});
