# capstone-WeLoveMovies

This capstone project is a backend server designed to access an SQL database containing information related to movies, ratings, and movie theaters.
Included in the source code for the backend are the migration files to create the database structure as well as the seed files that contain the initial data within the database.

The SQL database consists of 5 tables:
  - movies
  - critics
  - reviews
  - theaters
  - movies_theaters

There are 3 main routes including:
  - /movies
  - /reviews
  - /theaters
  
Within /movies there are multiple API endpoints
  - GET /movies
  - GET /movies/:movieId
  - GET /movies/:movieId/reviews
  - GET /movies/:movieId/theaters
  
Within /reviews there is one API endpoint that supports 2 methods
  - DELETE, PUT /reviews/:reviewId

There is only one endpoint in /theaters
  - GET /theaters
