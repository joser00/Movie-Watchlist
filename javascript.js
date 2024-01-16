let stringMovies = ""
function getMovies() {
  const movieForm = document.getElementById("movie-form");
  movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(movieForm);
    let nameMovie = formData.get("searchMovie");
  
    fetch(`http://www.omdbapi.com/?apikey=c6ecc1d3&s=${nameMovie}&type=movie`)
      .then((data) => data.json())
      .then((response) => {
        
        for (let movie of response.Search) {
            fetch(`http://www.omdbapi.com/?apikey=c6ecc1d3&i=${movie.imdbID}&type=movie&plot=short`)
            .then(response2 => response2.json())
            .then(data => {
              if(data.Poster==='N/A'){
                console.log("En "+data.Tittle+" el poster no esta disponible")
              }else {
                stringMovies += `
                <div class="movie">
                <img src=${data.Poster} alt="Image of the movie" /> 
                  <div class="features">
                  <h3>
                    ${data.Title}
                    <i class="fa-solid fa-star" class='rating'></i>
                    <span>${data.imdbRating}</span>
                  </h3>
                  <div class='options-movie'>
                  <p>${data.Runtime}</p>
                  <p>${data.Genre}</p>
                  <p><i class="fa-solid fa-plus"></i> Watchlist</p>
                  </div>
                  <p>
                  ${data.Plot}
                 </p>
                  </div>
                </div> 
                <hr/>
                `;
              }
                document.getElementById("movie-container").innerHTML = stringMovies;
                
            })
            stringMovies = ''
            
        }
      });
      document.getElementById('search-movie').value = ''
  });
}

getMovies();
