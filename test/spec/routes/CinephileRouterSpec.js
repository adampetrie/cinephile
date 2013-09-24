/*global cinephile, Backbone, describe, it, expect, beforeEach, afterEach, sinon */
'use strict';

(function () {
    
    describe('cinephile.Routers.CinephileRouter', function () {
            
        it('should be defined', function () {
            expect(cinephile.Routers.CinephileRouter).toBeDefined();
        });
        
        beforeEach(function () {
            
            this.router = new cinephile.Routers.CinephileRouter();
            this.routeSpy = sinon.spy();
           
            try
            {
                Backbone.history.start({ silent : true });
            }
            catch(e) {}
            
            this.router.navigate('elsewhere');
            
            this.homeViewStub = sinon.stub(cinephile.Views, 'HomeView')
                .returns(new Backbone.View());
            this.favouritesViewStub = sinon.stub(cinephile.Views, 'FavouriteMoviesView')
                .returns(new Backbone.View());
        });
        
        afterEach(function () {
            this.homeViewStub.restore();
            this.favouritesViewStub.restore();
        });
        
        describe('Home Route', function() {
            
            it('should load the homepage on a blank route', function () {
                
                this.router.bind('route:home', this.routeSpy);
                this.router.navigate('', true);
                
                expect(this.routeSpy.calledOnce).toBeTruthy();
                expect(this.routeSpy).toHaveBeenCalledWith();
            });
            
            it('creates a home view if one doesn\'t exist', function () {
                this.router.home();
                expect(this.homeViewStub).toHaveBeenCalledOnce();
            });
            
            it('Reuses the home view if one does exist', function () {
                this.router.home();
                this.router.home();
                expect(this.homeViewStub.calledTwice).toBeFalsy();
            });
        });
        
        describe('Favourites Route', function() {
            
            it('should load the favourites on /favourites', function () {
                
                this.router.bind('route:favourites', this.routeSpy);
                this.router.navigate('favourites', true);
                
                expect(this.routeSpy).toHaveBeenCalledOnce();
                expect(this.routeSpy).toHaveBeenCalledWith();
            });
            
            it('creates a favourites view if one doesn\'t exist', function () {
                this.router.favourites();
                expect(this.favouritesViewStub).toHaveBeenCalledOnce();
            });
            
            it('Reuses the favourites view if one does exist and reset it\'s collection', function () {
                this.router.favourites();
                this.router.favourites();
                
                expect(this.favouritesViewStub).toHaveBeenCalledOnce();
                expect(this.favouritesViewStub.render).toHaveBeenCalledTwice();
            });
        });
        
        describe('Details Route', function () {
            
            it('should load the details page on /details/id passing a movie ID', function () {
                
                this.router.bind('route:details', this.routeSpy);
                this.router.navigate('details/562', true);
                
                expect(this.routeSpy).toHaveBeenCalledOnce();
                expect(this.routeSpy).toHaveBeenCalledWith('562');
            });
        });
    });
    
})();