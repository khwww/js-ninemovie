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
  categorySlide.innerHTML = '<div class="swiper-wrapper"></div>';
  const swiperWrapper = categorySlide.querySelector('.swiper-wrapper');

  data.forEach(movie => {
    const {title, poster_path} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('swiper-slide', 'movie');
    movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">${title}
        `
        swiperWrapper.appendChild(movieEl);
  });
  initializeSwiper();
}


function initializeSwiper() {
  const slides = document.querySelectorAll('.swiper-container .swiper-slide');
  const slidesCount = slides.length;

  let slidesPerView = 10; //한번에 보여줄 슬라이드 개수
  let slidesPerGroup = 1; //한번에 이동할 슬라이드 개수

  if (slidesCount < slidesPerView) {
    slidesPerView = slidesCount;
    slidesPerGroup = slidesCount;
  }

  new Swiper('.swiper-container', {
    slidesPerView: slidesPerView,
    slidesPerGroup: slidesPerGroup,
    spaceBetween: 10,
    loop: slidesCount >= slidesPerView,
    navigation: {
      prevEl: '.swiper-icon-left',
      nextEl: '.swiper-icon-right'
    }
  });
}


//NavBar  
const openNav = () => {
  document.getElementById("topnav").style.display = 'block';
}

const closeNav = () => {
  document.getElementById("topnav").style.display = 'none';
}

