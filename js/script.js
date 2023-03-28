const global = {
  currentPage: window.location.pathname,
};

// Display popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular/');
  showSpinner();

  let imgPath;
 
  results.forEach((show) => {
    if (show.poster_path) {
      imgPath = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;
    } else {
      imgPath = `images/no-image.jpg`;
    }

    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
  <a href="tv-details.html?id=${show.id}">
    <img
      src="${imgPath}"
      class="card-img-top"
      alt="${show.name}"
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Aired: ${show.first_air_date}</small>
    </p>
  </div>`;

    document.querySelector('#popular-shows').appendChild(div);
    hideSpinner();
  });
}

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular/');

  results.forEach((movie) => {
    let imgPath;
    // Check if there is a image avalible
    if (movie.poster_path) {
      imgPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    } else {
      imgPath = '../images/no-image.jpg';
    }

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `      
        <a href="movie-details.html?id=${movie.id}">
          <img
            src="${imgPath}"
            class="card-img-top"
            alt="${movie.title}"
          />
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>`;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// display movie details

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);
  let imgPath;

  if (movie.poster_path) {
    imgPath = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
  } else {
    imgPath = 'images/no-image.jpg';
  }
  
  const div = document.createElement('div');
  div.innerHTML = `        
  <div class="details-top">
  <div>
    <img
      src="${imgPath}"
      class="card-img-top"
      alt="${movie.title}"
    />
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      <li>Genre 1</li>
      <li>Genre 2</li>
      <li>Genre 3</li>
    </ul>
    <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $1,000,000</li>
    <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
    <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
    <li><span class="text-secondary">Status:</span> Released</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">Company 1, Company 2, Company 3</div>
</div>`;
  
  document.querySelector('#movie-details').appendChild(div);

  console.log();
  

}

// Fetch data from TMDB API

async function fetchAPIData(endpoint) {
  const API_KEY = '8e61e0b61ea6908e3b34fdc8e05bdd0d';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highLightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/tv-details.html':
      console.log('TV Show Details');
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/search.html':
      console.log('Search Page');
      break;
  }

  highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
