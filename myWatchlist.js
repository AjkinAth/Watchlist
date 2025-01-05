let idList = JSON.parse(localStorage.getItem('idList'))
function getWatchlist(){
    for (id of idList){
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
                  <p class="add-watchlist"><i class="fa-solid fa-circle-minus" data-button="${data.imdbID}"></i>Watchlist</p>
                 </div>
                 <p class="description">${data.Plot}</p>
                </div>
            </section>`})
}
}
getWatchlist()
if(idList.length > 0){
document.getElementById('empty-page').style.display = 'none'
}
document.addEventListener('click',e => {
    if(e.target.dataset.button){
        localStorage.removeItem('idList')
        newList = idList.filter(item => item != e.target.dataset.button)
        localStorage.setItem('idList',JSON.stringify(newList))
        document.getElementById('movie-list').innerHTML = ''
        idList = JSON.parse(localStorage.getItem('idList'))
        getWatchlist()
    }
    if(idList.length === 0){
        document.getElementById('empty-page').style.display ='flex'
    }
})
