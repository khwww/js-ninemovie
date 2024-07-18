const API_KEY = config.apikey;

// recommendation.js
let popularPostList = [];
let nowPlayingPostList = [];
let scrollAmount = 0;
let popularKey = null;
let nowPlayingKey = null;

// TMDB API에서 인기 영화 데이터 받아오기
const getPopularMovie = async () => {
  const url = new URL(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}`);
  console.log("popular-url", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    popularPostList = data.results; // 데이터 전역 변수로 할당
    console.log(popularPostList); // 데이터 확인용 로그
    renderPopular();
    movieListRecommend();
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

// TMDB API에서 현재 상영 중인 영화 데이터 받아오기
const getNowPlayingMovie = async () => {
  const url = new URL(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&api_key=${API_KEY}`);
  console.log("now-url", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    nowPlayingPostList = data.results; // 데이터 전역 변수로 할당
    nowPlayingMovieList();
    console.log(nowPlayingPostList); // 데이터 확인용 로그
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

//
const getPopularMovie = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}`
  );
  console.log("popular-url", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    popularPostList = data.results;
    renderPopular();
    movieListRecommend();
    console.log("popular Data", popularPostList);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const getNowPlayingMovie = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&api_key=${API_KEY}`
  );
  console.log("now-url", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    nowPlayingPostList = data.results;
    nowPlayingMovieList();
    console.log("now playing Data", nowPlayingPostList);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

//

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
  popularKey = document.querySelector('.movie-list');
};

// 현재 상영 중인 영화 리스트 렌더링
const nowPlayingMovieList = () => {
  const movieNowPlayingHTML = nowPlayingPostList.map((movie) =>
    `<div class="movie-list-item">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-list-item-img" alt="${movie.title}">
      </div>`).join('');

  document.querySelector('.now-playing-movie-list').innerHTML = movieNowPlayingHTML;
};



// 슬라이드 이동 기능 구현
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

const handleScroll = (direction, listClass) => {
  const listElement = document.querySelector(listClass);
  const scrollWidth = listElement.scrollWidth - listElement.clientWidth;

  if (direction === 'right' && scrollAmount < scrollWidth) {
    scrollAmount += 200;
    listElement.style.transform = `translateX(-${scrollAmount}px)`;
  } else if (direction === 'left' && scrollAmount > 0) {
    scrollAmount -= 200;
    listElement.style.transform = `translateX(-${scrollAmount}px)`;
  }
};

document.getElementById('right-arrow-popular').addEventListener('click', () => handleScroll('right', '.movie-list'));
document.getElementById('left-arrow-popular').addEventListener('click', () => handleScroll('left', '.movie-list'));
document.getElementById('right-arrow-now-playing').addEventListener('click', () => handleScroll('right', '.now-playing-movie-list'));
document.getElementById('left-arrow-now-playing').addEventListener('click', () => handleScroll('left', '.now-playing-movie-list'));

// 영화 데이터 받아오기
getPopularMovie();
getNowPlayingMovie();
