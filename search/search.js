// const API_key = config.apikey;
// const API_KEY = `api_key=bd09ec96d68f7f24d24f00a9149d0e0a`; 희정

const API_KEY = `bd09ec96d68f7f24d24f00a9149d0e0a`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
let moviesList = []; //result 안에 title있음

//NavBar
const openNav = () => {
  document.getElementById("topnav").style.display = "block";
};

const closeNav = () => {
  document.getElementById("topnav").style.display = "none";
};

const getMovies = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  );

  const response = await fetch(url);
  const data = await response.json();
  moviesList = data.results;
  render();
  console.log("response", moviesList);
};

//Category
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getMoviesCategory(event))
);

const getMoviesCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  let categoryUrl;

  switch (category) {
    case "영화":
      categoryUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en`;
      break;
    case "인기":
      categoryUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en`;
      break;
    case "최신":
      categoryUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en`;
      break;
    default:
      categoryUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en`;
  }

  try {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    moviesList = data.results;
    renderInitial();
    console.log("Response:", moviesList);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

//category 클릭하면 보여지는 영화리스트
const renderInitial = () => {
  const moviesHTML = moviesList
    .map(
      (movies) => ` <div class="movie">
                      <img src=${IMG_URL + movies.poster_path}
                      onclick="navigateToDetail(${movies.id})" alt="${
        movies.title
      }">
                    </div>`
    )
    .join("");

  document.getElementById("initial-movie-board").innerHTML = moviesHTML;
  document.getElementById("second-section").classList.add("hidden");
};

//SearchInput 서치하면 보여지는 영화리스트
document
  .getElementById("search-input")
  .addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      getMoviesByKeyword();
    }
  });

const getMoviesByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en&query=${keyword}`
  );

  try {
    const response = await fetch(url);
    const data = await response.json();
    moviesList = data.results;
    render();
    console.log("keyword", data);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

//Search 내부의 영화리스트
const render = () => {
  const moviesHTML = moviesList
    .filter((movie) => movie.poster_path) //이미지있는 영화만 보이도록 하기
    .map(
      (movies) => `
        <div class="swiper-slide swiper-slide_1 movie">
          <img src=${IMG_URL + movies.poster_path} onclick="navigateToDetail(${
        movies.id
      })" alt="${movies.title}">
        </div>`
    )
    .join("");

  document.querySelector("#movie-search-board .swiper-wrapper").innerHTML =
    moviesHTML;
};

getMovies();

const swiper = new Swiper("#movie-search-board", {
  slidesPerView: 1, // 보여줄 갯수
  spaceBetween: 10, // 간격
  freeMode: true,
  // nav 버튼
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // 반응형
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 10,
    },
  },
});
