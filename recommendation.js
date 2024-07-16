const API_KEY = `af4e249f208fd13fc96bb460a631d94a`;
let popularMovieList = [];

const getPopularMovie = async() => {
    url = new URL (
        `https://api.themoviedb.org/3/movie/popular?language=kr-KO&page=1&api_key=${API_KEY}`
    )   
    console.log("uuu", url);

    const response = await fetch(url);
};

    getPopularMovie();