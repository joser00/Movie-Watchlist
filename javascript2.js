let arrayMovieString = localStorage.getItem('movie')
let arrayMovie = JSON.parse(arrayMovieString)

function renderArray() {
  let string = ''
  for (let movieID of arrayMovie) {
    fetch(`http://www.omdbapi.com/?apikey=c6ecc1d3&i=${movieID}`)
    .then(response => response.json())
    .then(data => {
        string += `
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
          <p><i data-watchlist=${data.imdbID} class="fa-solid fa-minus" id="watchlist-btn"></i> Watchlist</p>
          </div>
          <p>
          ${data.Plot}
         </p>
          </div>
        </div> 
        <hr/>
        `;
        document.getElementById('advice-container').innerHTML = string
    })
    
}
}
function removeItem(){
  document.addEventListener('click',(e)=> {
      if(e.target.dataset.watchlist){
        let positionToDelete = arrayMovie.indexOf(e.target.dataset.watchlist)
        if(arrayMovie.length>0){
          arrayMovie.splice(positionToDelete,1)
          localStorage.setItem('movie',JSON.stringify(arrayMovie))
         
        }
      }
      
    })
    
}

removeItem()
renderArray()


