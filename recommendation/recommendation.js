const API_KEY = config.apikey;

let popularPostList = [];
let currentIndex = 0;


const getPopularMovie = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${API_KEY}`
  )
  console.log("uuu", url);

try {
  const response = await fetch(url);
  const data = await response.json();
  popularPostList = data.results;   //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다
  renderPopular();
  movieListRecommend();
  console.log("DDD", popularData);
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

 document.querySelector('.movie-list').innerHTML = movieRecommendHTML;

 
};

// Javascript 커스컴 슬라이더 기능 가져와 구현해보기




const movieList = document.querySelector(".movie-list");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let scrollAmount = 0;


// 슬라이드를 오른쪽으로 이동
rightArrow.addEventListener('click', () => {

  const sliderWidth = movieList.scrollWidth - movieList.clientWidth;
  if (scrollAmount < sliderWidth) {
      scrollAmount += 200; // 슬라이드 이동량 조절
      movieList.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

// 슬라이드를 왼쪽으로 이동
leftArrow.addEventListener('click', () => {
  if (scrollAmount > 0) {
      scrollAmount -= 200; // 슬라이드 이동량 조절
      movieList.style.transform = `translateX(-${scrollAmount}px)`;
  }
});




getPopularMovie();




