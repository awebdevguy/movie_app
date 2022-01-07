const API_KEY = 'dcf6ba5a6d4da4b09ad98e6e07e42967';
// const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + API_KEY;
const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + API_KEY;

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(URL);

async function getMovies(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  showMovies(data.results);
  console.log(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  
  movies.forEach((movie) => {
    const {poster_path, title, overview, vote_average} = movie;
    const movieElement = document.createElement('div');

    console.log(title);

    movieElement.classList.add('movie');
    movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `
    main.appendChild(movieElement);
  });
}

function getClassByRate(vote) {
  if(vote >= 8) {
    return 'green';
  } else if(vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});