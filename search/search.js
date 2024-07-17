// const API_key = config.apikey;
// const API_KEY = `api_key=bd09ec96d68f7f24d24f00a9149d0e0a`;
// const BASE_URL = `https://api.themoviedb.org/3/`;
// const API_URL = BASE_URL + `discover/movie?sort_by=popularity.desc&`+ API_KEY;
// const IMG_URL = `https://image.tmdb.org/t/p/w500`;
// const searchURL = BASE_URL + '/search/movie?' + API_KEY;



//NavBar  
const openNav = () => {
  document.getElementById("topnav").style.display = 'block';
}

const closeNav = () => {
  document.getElementById("topnav").style.display = 'none';
}



const API_KEY = `bd09ec96d68f7f24d24f00a9149d0e0a`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
let moviesList = []; //result 안에 title있음
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getMoviesCategory(event)))


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
    case '인기':
      categoryUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en`;
      break;
    case '최신작':
      categoryUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en`;
      break;
    default:
      categoryUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en`;
  }

    try {
    const response = await fetch(categoryUrl);
    const data = await response.json();
    moviesList = data.results;
    render();
    console.log("Response:", moviesList);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const render = () => {
  const moviesHTML = moviesList.map(
    (movies) => ` <div class="swiper-wrapper">
                    <div class="swiper-slide_1 movie">
                      <img src=${IMG_URL + movies.poster_path}>
                    </div>
                  </div>`
      ).join('');

  document.getElementById("movie-search-board").innerHTML = moviesHTML
}


getMovies();
