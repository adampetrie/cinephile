/*global describe, it */
'use strict';

(function () {
    describe('Tests for Cinephile', function () {
        
        it('Should contain test data for the film Die Hard', function () {
            expect(dieHard).toBeDefined();
        });
        
        describe('cinephile.Models.MovieDetailsModel', function () {
            
            it('should be defined', function () {
                expect(cinephile.Models.MovieDetailsModel).toBeDefined(); 
            });
            
            describe('instantiating a new MovieDetailsModel', function () {
                
                beforeEach(function() {
                    
                    spyOn($, 'ajax').andCallFake(function(options) {
                        options.success(dieHard);
                    });
                    
                    this.movieDetailsModel = new cinephile.Models.MovieDetailsModel({ id : 562 });
                    this.movieDetailsModel.fetch();
                });
                
                it('will populate itself with movie information from TMDb based on an ID', function () {
                    expect(this.movieDetailsModel.get('title')).toBe('Die Hard');
                });
                
                it('is created with the default watched value as false', function () {
                    expect(this.movieDetailsModel.get('watched')).toEqual(false);
                });
                
                it('can have the value for watched toggled between true and false', function () {
                    this.movieDetailsModel.toggleWatched();
                    expect(this.movieDetailsModel.get('watched')).toEqual(true);
                });
            })
        });
    });
})();

var dieHard = {
    "genres": [
        {"id":28,"name":"Action"},
        {"id":53,"name":"Thriller"}
    ],
    "id":562,
    "imdb_id":"tt0095016",
    "overview":"NYPD cop John McClane's plan to reconcile with his estranged wife, Holly, is thrown for a serious loop when minutes after he arrives at her office, the entire building is overtaken by a group of pitiless terrorists. With little help from the LAPD, wisecracking McClane sets out to single-handedly rescue the hostages and bring the bad guys down.",
    "release_date":"1988-07-14",
    "title":"Die Hard",
};
