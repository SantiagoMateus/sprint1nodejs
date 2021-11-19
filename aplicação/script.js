const API_KEY = 'api_key=79b58f29c2a3251991fd7e008bfe9d61';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tags = document.getElementById('tags');

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie;
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = 
        `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/200x200" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <p>Nota:<p>
                <span class="${vote_average}">${vote_average}</span>
            </div>
        `
        main.appendChild(movieDiv);
    })
}

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">Sem resultados</h1>`
        }
    })
}

getMovies(API_URL);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }
})

