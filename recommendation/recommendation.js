
const API_KEY = `af4e249f208fd13fc96bb460a631d94a`;

let popularPostList = [];
let nowPlayingPostList = [];
let trendingPostList = [];
let scrollStates = {
  '.popular-movie-list': { scrollAmount: 0 },
  '.now-playing-movie-list': { scrollAmount: 0 },
  '.trending-movie-list': { scrollAmount: 0 }
};

const getPopularMovie = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}`
  )
  console.log("popular-url", url);

  try {

    const response = await fetch(url);
    const data = await response.json();
    popularPostList = data.results;   //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다

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
    nowPlayingPostList = data.results;  //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다
    nowPlayingMovieList();
    console.log("now playing Data", nowPlayingPostList);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const getTrendingMovie = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/trending/movie/day?language=ko-KR&api_key=${API_KEY}`
  )
  console.log("trending-url", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    trendingPostList = data.results;   //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다
    trendingMovieList();
    console.log("trending Data", trendingPostList);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};


const renderPopular = () => {

  //보여줄 데이터 가져오기
  const popularHTML = popularPostList.map((movie, index) =>

    `<div class="carousel-item popular-img ${index === 0 ? 'active' : ''}" class="d-block w-100" alt="${movie.title}">
          <img
            src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}"
            class="d-block w-100" alt="${movie.title}">
              
          <div class="overlay">
              <div class="inner-title">
                   <h2>${movie.title}</h2>
              </div>
          </div>
     </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button> `).join('');

  const indicatorsHTML = popularPostList.map((_, index) => `
      <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
  `).join('');

  document.querySelector('.carousel-inner').innerHTML = popularHTML;
  document.querySelector('.carousel-indicators').innerHTML = indicatorsHTML;
}

// card 

const movieListRecommend = () => {
  const movieRecommendHTML = popularPostList.map((movie) =>

    ` <div class="movie-list-item">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-list-item-img" alt="${movie.title}">            
      </div>

`).join('');

  document.querySelector('.popular-movie-list').innerHTML = movieRecommendHTML;
};

const nowPlayingMovieList = () => {
  const movieNowPlayingHTML = nowPlayingPostList.map((movie) =>

    ` <div class="movie-list-item">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-list-item-img" alt="${movie.title}">            
      </div>

`).join('');

  document.querySelector('.now-playing-movie-list').innerHTML = movieNowPlayingHTML;

}


const trendingMovieList = () => {
  const movieTrendingHTML = trendingPostList.map((movie) =>

    ` <div class="movie-list-item">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-list-item-img" alt="${movie.title}">            
      </div>

`).join('');

  document.querySelector('.trending-movie-list').innerHTML = movieTrendingHTML;

}


// 슬라이드 이동 기능 구현



const handleScroll = (direction, listClass) => {
  const listElement = document.querySelector(listClass);
  const scrollWidth = listElement.scrollWidth - listElement.clientWidth;
  const currentScrollAmount = scrollStates[listClass].scrollAmount;

  if (direction === 'right' && currentScrollAmount < scrollWidth) {
    scrollStates[listClass].scrollAmount += 200;
    console.log("right", scrollStates[listClass].scrollAmount)
    if (scrollStates[listClass].scrollAmount > scrollWidth) {
      scrollStates[listClass].scrollAmount = scrollWidth;
    }
  } else if (direction === 'left' && currentScrollAmount > 0) {
    scrollStates[listClass].scrollAmount -= 200;
    console.log("left", scrollStates[listClass].scrollAmount)
    if (scrollStates[listClass].scrollAmount < 0) {
      scrollStates[listClass].scrollAmount = 0;
    }
  }

  listElement.style.transform = `translateX(-${scrollStates[listClass].scrollAmount}px)`;
};

document.getElementById('right-arrow-popular').addEventListener('click', () => handleScroll('right', '.popular-movie-list'));
document.getElementById('left-arrow-popular').addEventListener('click', () => handleScroll('left', '.popular-movie-list'));
document.getElementById('right-arrow-now-playing').addEventListener('click', () => handleScroll('right', '.now-playing-movie-list'));
document.getElementById('left-arrow-now-playing').addEventListener('click', () => handleScroll('left', '.now-playing-movie-list'));
document.getElementById('right-arrow-trending').addEventListener('click', () => handleScroll('right', '.trending-movie-list'));
document.getElementById('left-arrow-trending').addEventListener('click', () => handleScroll('left', '.trending-movie-list'));


getPopularMovie();
getNowPlayingMovie();
getTrendingMovie();
