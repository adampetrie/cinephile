/*global describe, it, expect */
'use strict';

var dieHard = {
    'genres': [
        {'id' : 28, 'name' : 'Action'},
        {'id' : 53, 'name' : 'Thriller'}
    ],
    'id':562,
    'imdb_id' : 'tt0095016',
    'overview': 'NYPD cop John McClane\'s plan to reconcile with his estranged wife, Holly, is thrown for a serious loop when minutes after he arrives at her office, the entire building is overtaken by a group of pitiless terrorists. With little help from the LAPD, wisecracking McClane sets out to single-handedly rescue the hostages and bring the bad guys down.',
    'release_date' : '1988-07-14',
    'title' : 'Die Hard'
};

(function () {
    
    describe('Tests for Cinephile', function () {
        
        it('Should contain test data for the film Die Hard', function () {
            expect(dieHard).toBeDefined();
        });
        
    });
    
})();