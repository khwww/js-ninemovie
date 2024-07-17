const API_KEY = config.apikey;
let popularPostList = [];


const getPopularMovie = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&api_key=${API_KEY}`
  )
  // console.log("uuu", url);


  const response = await fetch(url);
  const popularData = await response.json();
  popularPostList = popularData.results;   //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다
  console.log("DDD", popularPostList);

  renderPopular();
};

const renderPopular = () => {
  let popularHTML = ``;
  let indicatorsHTML = '';
  //보여줄 데이터 가져오기
  popularHTML = popularPostList.map((movie, index) =>

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

      indicatorsHTML = popularPostList.map((_, index) => `
        <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" aria-label="Slide ${index + 1}"></button>
    `).join('');


  document.querySelector('.carousel-inner').innerHTML = popularHTML;
  document.querySelector('.carousel-indicators').innerHTML = indicatorsHTML;
}

getPopularMovie();