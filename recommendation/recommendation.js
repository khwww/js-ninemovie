const API_KEY = config.apikey;
let popularPostList = [];
let currentIndex = 0;


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
  movieListRecommend();
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

// card 

const movieListRecommend =() => {
  let movieRecommendHTML ='';

  movieRecommendHTML = popularPostList.map((movie) => 

         ` <div class="movie-list-item">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top movie-list-item-img" alt="${movie.title}">
            
          </div>

`).join('');

 document.querySelector('.movie-list').innerHTML = movieRecommendHTML;

 
};

// Javascript 커스컴 슬라이더 기능 가져와 구현해보기
// const arrow =() => {


// }
// const arrowLeft = document.querySelectorAll(".arrow-left");
// const arrowRight = document.querySelectorAll(".arrow-right");

// const movieLists = document.querySelectorAll(".movie-list");


// // arrow right > button action
// arrowRight.forEach((arrowR, i) => {
//   const itemNumber = movieLists[i].querySelectorAll("img").length;
//   let clickCounter1 = 0;
//   arrowR.addEventListener("click", () => {
//     const ratio = Math.floor(window.innerWidth / 200);
//     clickCounter1++;
//     if (itemNumber - (4 + clickCounter1) + (4 - ratio) >= 0) {
//       movieLists[i].style.transform = `translateX(${
//         movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
//       }px)`;
//     } else {
//       movieLists[i].style.transform = "translateX(0)";
//       clickCounter1 = 0;
//     }
//   });

//   console.log(Math.floor(window.innerWidth / 200));
// });



// // arrow left < button action

// arrowLeft.forEach((arrowL, i) => {
//   const itemNumber = movieLists[i].querySelectorAll("img").length;
//   let clickCounter2 = itemNumber;
//   arrowL.addEventListener("click", () => {
//     const ratio = Math.floor(window.innerWidth / 200);
//     clickCounter2--;
//     if (itemNumber - (4 + clickCounter2) + (4 - ratio) >= itemNumber) {
//       movieLists[i].style.transform = `translateX(${
//         movieLists[i].computedStyleMap().get("transform")[0].x.value -300
//       }px)`;
//     } else {
//       movieLists[i].style.transform = "translateX(0)";
//       clickCounter2 = 0;
//     }
//   });

//   console.log(Math.floor(window.innerWidth / 200));
// });



//JavaScript로 커스텀 슬라이더 기능 구현하기
// const moveCarousel = (direction) => {

//   let arrow = popularPostList.map((movie) => {

//     const carouselInner = 0;
//     // document.querySelector('.movie-list');
//     const totalItems = arrow;
//     // document.querySelectorAll('.movie-list-item').length;
//     const itemsPerView = 3; // 한 번에 보이는 카드 수
  
//     if (direction === 'next') {
//         if (currentIndex < totalItems - itemsPerView) {
//             currentIndex++;
//         }
//     } else if (direction === 'prev') {
//         if (currentIndex > 0) {
//             currentIndex--;
//         }
//     }
  
//     const translateX = -currentIndex * (100 / itemsPerView);
//     carouselInner.style.transform = `translateX(${translateX}%)`;

//   }
 
// };

// document.querySelector('.arrow-left').addEventListener('click', () => moveCarousel('next'));
// document.querySelector('.arrow-right').addEventListener('click', () => moveCarousel('prev'));




getPopularMovie();