const API_KEY = `af4e249f208fd13fc96bb460a631d94a`;
let popularPost = [];


const getPopularMovie = async() => {
    const url = new URL (
        `https://api.themoviedb.org/3/movie/popular?language=kr-KO&page=1&api_key=${API_KEY}`
    )   
    // console.log("uuu", url);
    

    const response = await fetch(url);
    const popularData = await response.json();
    popularPost = popularData.results;   //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다
    console.log("DDD",popularPost);
};


    getPopularMovie();