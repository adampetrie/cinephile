<?php

    include('./TMDb.php');
    
    $tmdb = new TMDb('bc96567e2f93790dea0e0c481845bc1b');

    $action = $_GET['action'];
        
    switch($action)
    {
        case 'configuration':
        
            $result = $tmdb->getConfiguration();
            break;
        
        case 'searchMovies':
            
            $result = $tmdb->searchMovie($_GET['title']);
            break;
        
        case 'getMovieDetails':
            
            $result = $tmdb->getMovie($_GET['movieId']);
            break;
        
        case 'getSimilarMovies':
            
            $result = $tmdb->getSimilarMovies($_GET['movieId']);
            break;
        
        default:
            
            $result = 'error!!';
    }
    
    echo json_encode($result);
?>