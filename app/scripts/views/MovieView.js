'use strict';

/*global cinephile, Backbone, JST, tmdbPosterSizes */

cinephile.Views.MovieView = Backbone.View.extend({
    
    tagName: 'li',

    className: 'movie span2',

    template: JST['app/scripts/templates/MovieView.ejs'],
    
    initialize: function()
    {
        this.render();
    },
    
    render : function()
    {
        this.$el.html(this.template(this.templateVariables()));
        return this;
    },
    
    templateVariables: function()
    {
        var templateVariables = {};
        
        if(this.options.smallThumbs === true)
        {
            templateVariables.thumbSize = tmdbPosterSizes[0];
        }
        else
        {
            templateVariables.thumbSize = tmdbPosterSizes[2];
        }
        
        templateVariables.id = this.model.get('id');
        templateVariables.poster_path = this.model.get('poster_path');
        
        return templateVariables;
    }
});
