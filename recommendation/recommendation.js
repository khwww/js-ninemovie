const API_KEY = `af4e249f208fd13fc96bb460a631d94a`;
let popularPostList = [];


const getPopularMovie = async() => {
    const url = new URL (
        `https://api.themoviedb.org/3/movie/popular?language=kr-KO&page=1&api_key=${API_KEY}`
    )   
    // console.log("uuu", url);
    

    const response = await fetch(url);
    const popularData = await response.json();
    popularPostList = popularData.results;   //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다
    console.log("DDD",popularPostList);

   renderPopular();
};

const renderPopular = () => {
    let popularHTML =``;

    //보여줄 데이터 가져오기
    popularHTML = popularPostList.map((movie, index) => `
      
        <div class="carousel-item ${index === 0 ? 'active' : ''}" class="d-block w-100" alt="${movie.title}">
          <img
            src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}"
            class="d-block w-100" alt="${movie.title}">
               <div>
      <h2>${movie.original_title}</h2>
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
      </button>
   
        
     
    `).join('');


    document.querySelector('.carousel-inner').innerHTML = popularHTML;
}

    getPopularMovie();