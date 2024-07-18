const apiKey = "4e4f177acb805afedb5f5f64d33de73d";
const youtubeApiKey = "AIzaSyCQKzBO4AtZ0_Fk7ViMJYWp1Ci2qzoQ8P4";
const movieId = 551;

async function fetchMovieDetails() {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ko-KR`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovieDetails(data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

function displayMovieDetails(movie) {
  document.getElementById("movieTitle").textContent = movie.title;
  document.getElementById(
    "movieRating"
  ).textContent = `평점: ${movie.vote_average}`;
  document.getElementById(
    "releaseDate"
  ).textContent = `개봉일: ${movie.release_date}`;
  document.getElementById("movieCategory").textContent = movie.genres
    .map((genre) => genre.name)
    .join(", ");
  document.getElementById("movieOverview").textContent = movie.overview;
  document.getElementById(
    "moviePoster"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  // 감독 정보 추가
  fetchMovieCredits(movie.id);

  // 영화 제목으로 유튜브 영상 검색
  searchYouTube(movie.title);
}

async function fetchMovieCredits(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=ko-KR`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovieCrew(data.crew);
  } catch (error) {
    console.error("Error fetching movie credits:", error);
  }
}

function displayMovieCrew(crew) {
  const director = crew.find((member) => member.job === "Director");
  if (director) {
    document.getElementById("movieCrew").innerHTML = `감독: ${director.name}`;
  }
}

// maxResults인자를 통해서 몇 개의 영상을 가져올 것인지를 결정
async function searchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${encodeURIComponent(
    query
  )} trailer&key=${youtubeApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("YouTube API response:", data); //로그확인
    displayVideos(data.items);
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    document.getElementById("videoResults").innerHTML =
      "YouTube 데이터를 가져오는 중 오류가 발생했습니다.";
  }
}

function displayVideos(items) {
  const videoResults = document.getElementById("videoResults");
  videoResults.innerHTML = "";

  items.forEach((item) => {
    const videoId = item.id.videoId;
    if (!videoId) {
      console.warn("No videoId found for item:", item); // 경고 로그 추가
      return;
    }
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    videoResults.appendChild(iframe);
  });
}

fetchMovieDetails();
