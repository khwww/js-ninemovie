// const API_key = config.apikey;
const API_KEY = `api_key=bd09ec96d68f7f24d24f00a9149d0e0a`;
const BASE_URL = `https://api.themoviedb.org/3/`;
const API_URL = BASE_URL + `discover/movie?sort_by=popularity.desc&`+ API_KEY;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const categorySlide = document.getElementById('category-slide');


getMovies(API_URL);

function getMovies(url) {
  fetch(url).then(response => response.json()).then(data => {
    console.log(data.results);
    showMovies(data.results);
  })
}

function showMovies(data) {
  categorySlide.innerHTML = '';

  data.forEach(movie => {
    const {title, poster_path} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">${title}
        `
    categorySlide.appendChild(movieEl);
  })
}

//NavBar  
const openNav = () => {
  document.getElementById("topnav").style.display = 'block';
}

const closeNav = () => {
  document.getElementById("topnav").style.display = 'none';
}

//Swiper
new Swiper('.swiper-container.movies-container', {
  slidesPerView: 10, 
  spaceBetween: 10,
  loop: true,
  navigation: {
    prevEl: 'swiper-left',
    nextEl: '.swiper-right'
  }
});