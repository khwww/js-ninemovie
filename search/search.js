// const API_key = config.apikey;
// const API_KEY = `api_key=bd09ec96d68f7f24d24f00a9149d0e0a`;

const API_KEY = `bd09ec96d68f7f24d24f00a9149d0e0a`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
let moviesList = []; //result 안에 title있음
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getMoviesCategory(event)))



//NavBar  
const openNav = () => {
  document.getElementById("topnav").style.display = 'block';
}

const closeNav = () => {
  document.getElementById("topnav").style.display = 'none';
}

const getMovies = async () => {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en`
  );
 const response = await fetch(url);
 const data = await response.json();
 moviesList = data.results; 
 render();
 console.log("response", moviesList);
};

const getMoviesCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  let categoryUrl;

  switch (category) {
    case '영화':
      categoryUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en`;
      break;
    case '인기':
      categoryUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en`;
      break;
    case '최신':
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
    console.error('Error fetching movies:', error);
  }
};

//category 이미지 보여주기 
const renderInitial = () => {
  const moviesHTML = moviesList.map(
    (movies) => ` <div class="movie">
                      <img src=${IMG_URL + movies.poster_path}>
                    </div>`
      ).join('');

      document.getElementById("initial-movie-board").innerHTML = moviesHTML
}


const getMoviesByKeyword = async() => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword",keyword);
  const url = new URL(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en&query=${keyword}`);

  try {
    const response = await fetch(url);
    const data = await response.json();
    moviesList = data.results;
    render();
    console.log("keyword", data);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};



const render = () => {
  const moviesHTML = moviesList
  .filter(movie => movie.poster_path) //이미지있는 영화만 보이도록 하기
  .map(
    (movies) => ` <div class="swiper-wrapper">
                    <div class="swiper-slide_1 movie">
                      <img src=${IMG_URL + movies.poster_path}>
                    </div>
                  </div>`
      ).join('');

      

  document.getElementById("movie-search-board").innerHTML = moviesHTML
}


getMovies();
