let popularPostList = [];
let nowPlayingPostList = [];
let trendingPostList = [];
let upcomingPostList = [];
let topRatedPostList = [];



const getMovieValues = async () => {
    const url = new URL(
      `${NINE_BASE_URL}/movie/popular?language=ko-KR&api_key=${RECOMMENDATION_API_KEY}` //Change url to variable
    );
    console.log("popular-url", url);
  
    try {
      const response = await fetch(url);
      const data = await response.json();

        

      popularPostList = data.results; //데이터 뿌려주기.  전역변수(global variable)로 할당해줬다
  
      renderPopular();
      movieListRecommend();
      console.log("popular Data", popularPostList);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };