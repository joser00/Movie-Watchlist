let stringMovies = "";
const movieForm = document.getElementById("movie-form");
const movieContainer = document.getElementById("movie-container")
const inputMovie = document.getElementById("search-movie")
const movieItem = JSON.parse(localStorage.getItem('movie')) || [];
function getMovies() {
  movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(movieForm);
    let nameMovie = formData.get("searchMovie");

    fetch(`http://www.omdbapi.com/?apikey=c6ecc1d3&s=${nameMovie}&type=movie`)
      .then((data) => data.json())
      .then((response) => {
        if(response.Search === undefined){
          movieContainer.innerHTML = `<h1 id='unable'>Unable to find what you’re looking for. Please try another search.</h1>`
        }else {
          for (let movie of response.Search) {
            fetch(
              `http://www.omdbapi.com/?apikey=c6ecc1d3&i=${movie.imdbID}&type=movie&plot=short`
            )
            .then((response2) => response2.json())
            .then((data) => {
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
                  <p><i data-watchlist=${data.imdbID} class="fa-solid fa-plus" id="watchlist-btn"></i> Watchlist</p>
                  </div>
                  <p>
                  ${data.Plot}
                 </p>
                  </div>
                </div> 
                <hr/>
                `;
              
              movieContainer.innerHTML =stringMovies;
            });
          stringMovies = "";
        }
        }
       
      });
    inputMovie.value = "";
  });
}
function addMovie() {
  document.addEventListener('click', (e) => {
    if (e.target.dataset.watchlist) {
      const movieID = e.target.dataset.watchlist;
      if (!movieItem.includes(movieID)) {
        movieItem.push(movieID);
        localStorage.setItem('movie', JSON.stringify(movieItem));
      }
    }
  });
}
getMovies();
addMovie()
