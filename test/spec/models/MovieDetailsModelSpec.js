/*global cinephile, describe, it, expect, beforeEach, sinon, dieHard */
'use strict';

(function () {
    
    describe('cinephile.Models.MovieDetailsModel', function () {
            
        it('should be defined', function () {
            expect(cinephile.Models.MovieDetailsModel).toBeDefined();
        });
        
        describe('A MovieDetailsModel', function () {
            
            beforeEach(function () {
                this.movieDetailsModel = new cinephile.Models.MovieDetailsModel({ id : 562 });
            });
            
            it('will populate itself with movie information from TMDb based on an ID', function () {
                
                this.server = sinon.fakeServer.create();
                
                this.server.respondWith('GET', '/cinephile/api/index.php?action=getMovieDetails&movieId=562',
                                        [200, {'Content-Type' : 'application/json'},
                                        JSON.stringify(dieHard)]);
                
                var callback = sinon.spy();
                
                this.movieDetailsModel.fetch({
                    success: callback
                });
                
                this.server.respond();
                
                expect(callback.called).toBeTruthy();
                
                expect(callback.getCall(0).args[0].get('title')).toEqual(dieHard.title);
                expect(callback.getCall(0).args[0].url()).toBe('/cinephile/api/index.php?action=getMovieDetails&movieId=' + this.movieDetailsModel.get('id'));
                
                this.server.restore();
            });
            
            it('will be created with the default watched value as false', function () {
                expect(this.movieDetailsModel.get('watched')).toEqual(false);
            });
            
            it('can have the value for watched toggled between true and false', function () {
                this.movieDetailsModel.toggleWatched();
                expect(this.movieDetailsModel.get('watched')).toEqual(true);
            });
        });
    });
    
})();