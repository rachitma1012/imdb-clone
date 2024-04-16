// elements that are modified through javascript
const favoriteMoviesList = document.querySelector('.collection');

// function to display favourite movies
function displayFavoriteMovies() {


const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
favoriteMoviesList.innerHTML='';
if(favoriteMovies.length!=0){
favoriteMovies.forEach(movie => {
  const listItem = document.createElement('div');
  
  listItem.innerHTML = `
    <div class="specific-container">
            <div class="specific-movie-image">
  <img src=${movie.Poster}/>
</div>
<div class="specific-movie-details">
  <div class="inner-container">
 <h2 class="specific-title">${movie.Title}</h2>
    
    <p class="spacing">Year&nbsp;:<span id="movie-year">&nbsp;${movie.Year}&nbsp;&nbsp;</span><span id="movie-rating">Ratings:${movie.Rated}</span>
  <span class="released">Released:${movie.Released}</span>
  </p>

  <p class="spacing-ele"><span class="common">Genre:</span>&nbsp;${movie.Genre}</p>

  <p class="spacing-ele"><span class="common">Writer:</span>&nbsp;${movie.Writer}</p>

  <p class="spacing-ele"><span class="common">Actors:</span>&nbsp;${movie.Actors}</p>

  <p class="spacing-ele"><span class="common">Plot:</span>${movie.Plot}</p>
  <p class="spacing-ele"><span class="common">Language:</span>English</p>
  <span class="spacing-ele">${movie.Awards}</span>
  <button onclick="removeFromFavorites('${movie.imdbID}')" id="btn-btn-removem">Remove from Favorites</button>
</div>
</div>
</div>
    
  `;
  favoriteMoviesList.appendChild(listItem);

});
}else{
  favoriteMoviesList.innerHTML = `<div class="nofav-movies">
     <h1>No Movies added to favourite</h1>
     <h3>For adding the movies <a href="/index.html">Click here</a>
  </div>`
}
}
  // Remove movie from favorites
  
 async function  removeFromFavorites(imdbID) {
    
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMovies = await favoriteMovies.filter(movie => movie.imdbID !== imdbID);
    console.log(favoriteMovies);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    alert("movie removed from the favourite!")
    displayFavoriteMovies();
    //location.reload();
  }
