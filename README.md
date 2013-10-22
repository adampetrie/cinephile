# cinephile #

Cinephile is a sample Javascript application that allows users to keep track of their favourite movies as well as suggesting other films that they might be interested in. The primary goal of Cinephile is to demonstrate Javascript application development using backbone.js

You can see the app in action [here](http://adampetrie.com/cinephile).

## Features ##

Cinephile alllows users to perform the following:

* Search for movies by title
* Add movies to a list of favourites
* Mark favourite movies as 'watched' or 'unwatched'
* View a list movies that TMDb deems to be similar to any given movie*
* Browser movie details for movies that are not in your favourites list

*Please note that the TMDb API matches films for similarity based on plot keywords only. Expect some strange results. More info available [here](https://www.themoviedb.org/talk/50855d9519c2954140000535).

## Technology ##

Cinephile uses the following technologies:

* Yeoman for application scaffolding
* Grunt for build tasks/complation
* Bower for dependency handling
* Twitter Bootstrap for UI look and feel
* PHP REST API for retrieving movie data
* Jasmine-based test suite

## Roadmap ##

In the future I plan to implement the following additional pieces to round out the application's robustness:

* Complete test suite for better code coverage
* Migrate favourite's list from localStorage to database
* Enhance error reporting (AJAX errors currently fail silently)
* Upgrade to Twitter Bootstrap 3
* Integrate Sinon.js for more sophisticated test cases

