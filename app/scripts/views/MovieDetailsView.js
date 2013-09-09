'use strict';

/*global cinephile, Backbone, JST, _*/

cinephile.Views.MovieDetailsView = Backbone.View.extend({

    template: JST['app/scripts/templates/MovieDetailsView.ejs'],
    
    initialize: function()
    {
        this.actionsView = new cinephile.Views.MovieDetailsActionsView({
            model: this.model,
            inFavourites: this.options.inFavourites
        });
        this.render();
    },
    
    render: function()
    {
        console.log(this.actionsView);
        
        this.$el.html(this.template(this.model.attributes));
        this.$('#actions').html(this.actionsView.el);
        this.getSimilarTitles();
        return this;
    },
    
    getSimilarTitles: function()
    {
        var instance = this;
        
        $.ajax({
            type: 'get',
            url: '/cinephile/api/index.php?action=getSimilarMovies&movieId=' + this.model.get('id'),
            dataType: 'JSON',
            success: function(data)
            {
                var collection = new Backbone.Collection(data.results);
                _.each(collection.models, function(element)
                {
                    var view = new cinephile.Views.MovieView({model: element, className: 'movie span1', smallThumbs: true});
                    instance.$('#similar-titles').append(view.el);
                });
            }
        });
    }
});
