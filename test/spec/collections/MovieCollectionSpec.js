/*global cinephile, Backbone, describe, it, expect, beforeEach, dieHard */
'use strict';

(function () {
    
    describe('cinephile.Collections.MovieCollection', function () {
           
        it('should be defined', function () {
            expect(cinephile.Collections.MovieCollection).toBeDefined();
        });
        
        describe('A MovieCollection', function () {
            
            beforeEach(function () {
                this.movieCollection = new cinephile.Collections.MovieCollection();
                this.movieCollection.model = cinephile.Models.MovieDetailsModel;
            });
            
            it('should listen for a favMovie:added event and add a movie object to itself', function() {
                
                this.movie = new Backbone.Model(dieHard);
                Backbone.trigger('favMovies:added', this.movie);
                
                expect(this.movieCollection.length).toEqual(1);
                expect(this.movieCollection.get(562).get('title')).toEqual('Die Hard');
            });
        });
    });
    
})();