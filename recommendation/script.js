const API_KEY = config.apikey; 

// recommendation.js
let popularPostList = [];
let scrollAmount = 0;

// TMDB API에서 인기 영화 데이터 받아오기
const getPopularMovie = async () => {
  const url = new URL(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    popularPostList = data.results; // 데이터 전역 변수로 할당
    renderPopular();
    movieListRecommend();
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

// 인기 영화 슬라이드를 렌더링
const renderPopular = () => {
  const popularHTML = popularPostList.map((movie, index) => `
    <div class="carousel-item popular-img ${index === 0 ? 'active' : ''}">
      <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" class="d-block w-100" alt="${movie.title}">
      <div class="overlay">
        <div class="inner-title">
          <h2>${movie.title}</h2>
        </div>
      </div>
    </div>
  `).join('');

  const indicatorsHTML = popularPostList.map((_, index) => `
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
  `).join('');

  document.querySelector('.carousel-inner').innerHTML = popularHTML;
  document.querySelector('.carousel-indicators').innerHTML = indicatorsHTML;
};

// 추천 영화 리스트 렌더링
const movieListRecommend = () => {
  const movieRecommendHTML = popularPostList.map(movie => `
    <div class="movie-list-item">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-list-item-img" alt="${movie.title}">
    </div>
  `).join('');

  document.querySelector('.movie-list').innerHTML = movieRecommendHTML;
};

// 슬라이드 이동 기능 구현
const movieList = document.querySelector('.movie-list');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// 슬라이드를 오른쪽으로 이동
rightArrow.addEventListener('click', () => {
  const sliderWidth = movieList.scrollWidth - movieList.clientWidth;
  if (scrollAmount < sliderWidth) {
    scrollAmount += 1000; // 슬라이드 이동량 조절
    movieList.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

// 슬라이드를 왼쪽으로 이동
leftArrow.addEventListener('click', () => {
  if (scrollAmount > 0) {
    scrollAmount -= 1000; // 슬라이드 이동량 조절
    movieList.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

// 영화 데이터 받아오기
getPopularMovie();
