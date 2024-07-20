const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const detail_apiKey = "4e4f177acb805afedb5f5f64d33de73d";
const youtubeApiKey = "AIzaSyCQKzBO4AtZ0_Fk7ViMJYWp1Ci2qzoQ8P4";
// const movieId = 557;

async function fetchMovieDetails() {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${detail_apiKey}&language=ko-KR`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovieDetails(data);
    fetchSimilarMovies(movieId);
    fetchMovieCast(movieId); // 출연진 정보를 가져오는 함수 호출
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
  document.getElementById(
    "movieRuntime"
  ).textContent = `러닝타임: ${movie.runtime}분`;
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
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${detail_apiKey}&language=ko-KR`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovieCrew(data.crew);
    displayMovieCast(data.cast); // 출연진 정보 표시 함수 호출
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

// 주요 출연진 정보를 가져오는 함수
async function fetchMovieCast(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${detail_apiKey}&language=ko-KR`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Movie Cast API response:", data); // 로그 추가
    displayMovieCast(data.cast);
  } catch (error) {
    console.error("Error fetching movie cast:", error);
  }
}

// 주요 출연진 정보를 표시하는 함수
function displayMovieCast(cast) {
  const castContainer = document.getElementById("movieCast");
  const castNames = cast
    .slice(0, 5)
    .map((member) => member.name)
    .join(", ");
  castContainer.innerHTML = `출연: ${castNames}`;
}

// 관련 콘텐츠를 가져오는 함수
async function fetchSimilarMovies(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${detail_apiKey}&language=ko-KR`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Similar Movies API response:", data); // 로그 추가
    displaySimilarMovies(data.results);
  } catch (error) {
    console.error("Error fetching similar movies:", error);
  }
}

function displaySimilarMovies(movies) {
  const similarMoviesContainer = document.getElementById("similarMovies");
  similarMoviesContainer.innerHTML = "";

  if (movies.length === 0) {
    similarMoviesContainer.innerHTML = "<p>추천할 콘텐츠가 없습니다.</p>";
    return;
  }

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("similar-movie");

    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">

    `;

    similarMoviesContainer.appendChild(movieElement);
  });
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

let currentPosition = 0;
const slideWidth = 220; // 포스터 너비 + 마진
const visibleSlides = 5;

function slideLeft() {
  const slider = document.getElementById("similarMovies");
  currentPosition = Math.min(currentPosition + slideWidth * visibleSlides, 0);
  slider.style.transform = `translateX(${currentPosition}px)`;
}

function slideRight() {
  const slider = document.getElementById("similarMovies");
  const maxPosition = -(slider.scrollWidth - slider.clientWidth);
  currentPosition = Math.max(
    currentPosition - slideWidth * visibleSlides,
    maxPosition
  );
  slider.style.transform = `translateX(${currentPosition}px)`;
}

fetchMovieDetails();
