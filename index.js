const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
let searchResult = []
let watchlistArray = JSON.parse(localStorage.getItem('idList'))
if (!watchlistArray){
    watchlistArray = []
}
searchBtn.addEventListener('click',function(){
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&type=movie&apikey=84c6528c`)
    .then(res=>res.json())
    .then(data => {
        searchInput.value = ''
        document.getElementById('no-result').style.display = 'none'
        document.getElementById('movie-list').innerHTML = ''
        let i = 0
        if (data.Search){
        for (let movieID of data.Search){
           searchResult[i] = movieID.imdbID
           i++
           }
        document.getElementById('movie-list').innerHTML = ''
           getMovies()}
           else{
            document.getElementById('no-result').style.display = 'flex'
           }
           document.getElementById('empty-page').style.display = "none"
    })
})
function getMovies(){
    for (id of searchResult){
fetch(`https://www.omdbapi.com/?i=${id}&type=movie&apikey=84c6528c`)
.then(res=>res.json())
.then(data=>{
    document.getElementById('movie-list').innerHTML +=`<section class="search-result">
                <img src="${data.Poster}">
                <div class="details">
                 <div >
                  <h2 class="title">${data.Title}</h2>
                  <h2 class="rating"><i class="fa-solid fa-star"></i>${data.imdbRating}</h2>
                 </div>
                 <div>
                  <p class="runtime">${data.Runtime}</p>
                  <p class="genre">${data.Genre}</p>
                  <p class="add-watchlist"><i class="fa-solid fa-circle-plus" data-button="${data.imdbID}"></i>Watchlist</p>
                 </div>
                 <p class="description">${data.Plot}</p>
                </div>
            </section>`})
}
}
document.addEventListener('click', e => {
    if (e.target.dataset.button){
    watchlistArray.unshift(e.target.dataset.button)
    localStorage.setItem('idList',JSON.stringify(watchlistArray))
    }
    })