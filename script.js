    //  elements that are modified with the help of javascript
    const outercontainer = document.querySelector('.main')
    const btn = document.querySelector('.btn-btn');
    const container = document.querySelector('.container');
    const input = document.querySelector('.search-box');
    const specificmoviedetails = document.querySelector('.specific-container-movie');
    const favouritelist = document.querySelector('.displaylistofmovies');
    const apikey = "8b868927";

     
        const notfound = document.createElement('div');
        notfound.className = "notfound";
        specificmoviedetails.append(notfound);
        // function to get movies list from the api when something written on the search input
    const getData = async(movie)=>{
         // console.log(movie)
         try{
        const data = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${apikey}`);
    const jsonData = await data.json();

    if(jsonData.Response=="True"){
        
        displaymovies(jsonData.Search);


    }
}catch(err){
    console.log(err);
}
}
      // function if specific movies search with the help of search button
      const specificmoviesearch = async()=>{
 try{
       let searchvalue = (input.value).trim();
        const data = await fetch(`https://www.omdbapi.com/?t=${searchvalue}&apikey=${apikey}`);
    const jsonData = await data.json();
    console.log(jsonData);
     if(jsonData.Title){
          specifunmovieAll(jsonData);
     }
     else{
        container.innerHTML="";
        notfound.innerHTML=`<h1>404</h1>
        <h1>Not Found</h1>
        <h3>Please try again/Movie not exist</h3>`;
     }
     input.value='';
    }catch(err){
        console.log(err);
    }
    }
    const result = ()=>{
        let searchItem = (input.value).trim();
        
        if(searchItem.length>0){
            getData(searchItem)
            container.classList.remove('hidden');
            
        }
    }
    let moviePoster
    // function to display movies on the basis of search preferences
    const displaymovies = (movies)=>{

       container.innerHTML = '';
       
       for(let i=0;i<movies.length;i++){
        const movieslist = document.createElement('div');
        movieslist.dataset.id = movies[i].imdbID;
        movieslist.className = 'movie-card';
        if(movies[i].Poster!="N/A"){
            moviePoster = movies[i].Poster
        }
            
        movieslist.innerHTML = ` <div class="cards">
        <div class="img-container">
            <img src=${moviePoster?moviePoster:"blank.jpg"}>
        </div>
        <div class="short-summary">
        <h3>${movies[i].Title}</h3>
        <h3>${movies[i].Year}</h3>
        
    </div>
    </div>`
        container.append(movieslist)
       }
       loadspecificmovie()
    }
    // function to fetch the specific movie details from the api
    const loadspecificmovie = async()=>{
        const searchmovie = document.querySelectorAll('.movie-card');

        searchmovie.forEach((movie)=>{
            movie.addEventListener('click',async()=>{
            
                input.value="";
                container.innerHTML = "";
                  try{
                 const data = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${apikey}`);
                 const specificmovie = await data.json();
                 specifunmovieAll(specificmovie)
                  }catch(err){
                    console.log(err);
                  }
            })
        })
        
    }
 // function for displaying details of selected movies
       function specifunmovieAll(specificmovie){
        notfound.innerHTML = '';
        container.innerHTML = '';
        input.value='';
        specificmoviedetails.innerHTML =`
                   <div class="specific-container">
                  <div class="specific-movie-image">
        <img src=${specificmovie.Poster}/>
    </div>
    <div class="specific-movie-details">
        <div class="inner-container">
       <h2 class="specific-title">${specificmovie.Title}</h2>
          
          <p class="spacing">Year&nbsp;:<span id="movie-year">&nbsp;${specificmovie.Year}&nbsp;&nbsp;</span><span id="movie-rating">Ratings:${specificmovie.Rated}</span>
        <span class="released">Released:${specificmovie.Released}</span>
        </p>
    
        <p class="spacing-ele"><span class="common">Genre:</span>&nbsp;${specificmovie.Genre}</p>
    
        <p class="spacing-ele"><span class="common">Writer:</span>&nbsp;${specificmovie.Writer}</p>
    
        <p class="spacing-ele"><span class="common">Actors:</span>&nbsp;${specificmovie.Actors}</p>
    
        <p class="spacing-ele"><span class="common">Plot:</span>${specificmovie.Plot}</p>
        <p class="spacing-ele"><span class="common">Language:</span>English</p>
        <span class="spacing-ele">${specificmovie.Awards}</span>
        <button onclick="addToFavorites('${specificmovie.imdbID}')" id="btn-btn-favourites">Add to favourites</button>
    </div>
</div>
   </div>`
   
       }
       // function to add movies in the favourites
      async function addToFavorites(imdbID) {
       const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}`;
    
      await fetch(url).then(response => response.json()).then(data => {
          const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
          if(favoriteMovies.length!=0){
              const check = favoriteMovies.some(obj=>obj.imdbID === imdbID);
              console.log(check)
              if(check) alert('movie is alrady added to favourite!')
              else{  favoriteMovies.push(data);
                localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
                alert("Added to favourite!")
          }
        }if(favoriteMovies.length===0){
          favoriteMovies.push(data);
          localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
          alert("Added to favourite!")
        }
           
         }).catch(error => console.error('Error:', error));
         }
     
         
    
// function for displaying favourite movies
     function displayFavoriteMovies() {
        outercontainer.innerHTML='';
        specificmoviedetails.innerHTML=""
      const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
        favouritelist.innerHTML='';
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
        favouritelist.appendChild(listItem);
      });
    }

    // Remove movie from favorites
    function removeFromFavorites(imdbID) {
      let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
      favoriteMovies = favoriteMovies.filter(movie => movie.imdbID !== imdbID);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      alert('movie removed from the favourite!')
      displayFavoriteMovies();
    
    }

   