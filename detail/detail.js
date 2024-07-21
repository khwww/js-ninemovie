const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const detail_apiKey = "4e4f177acb805afedb5f5f64d33de73d";
const youtubeApiKey = "AIzaSyCQKzBO4AtZ0_Fk7ViMJYWp1Ci2qzoQ8P4";

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

  // 영화 제목으로 유튜브 영상 검색(할당량이슈)
  // searchYouTube(movie.title);

  // 찜하기
  displayLike(movie);
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
    movieElement.classList.add("swiper-slide");

    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" data-id="${movie.id}">
    `;

    movieElement.addEventListener("click", () => {
      window.location.href = `detail.html?id=${movie.id}`;
    });

    similarMoviesContainer.appendChild(movieElement);
  });

  // Swiper 초기화
  new Swiper(".swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 7,
    spaceBetween: 5,
    loop: false,
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

document.addEventListener("DOMContentLoaded", function () {
  fetchMovieDetails();
});

/**
 * 찜하기
 */

// 찜한 영화 데이터 가져오기
const getWishlist = () => {
  const wishlist = localStorage.getItem("wishlist");
  console.log("로컬스토리지에서 저장된 찜한 데이터", JSON.parse(wishlist));
  return wishlist ? JSON.parse(wishlist) : [];
};

// 로컬스토리지에 찜 저장
const saveWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const displayLike = (movie) => {
  // 찜한 찜한 영화 데이터 가져오기
  const wishlist = getWishlist();
  // 찜 여부 확인
  const liked = wishlist.some((item) => item.id === movie.id);

  // 찜 여부에 따라 표시
  let likeButtonHTML = ``;
  if (!liked) {
    likeButtonHTML = `
      <button id="like-button" type="button" onclick='addToWishlist(${JSON.stringify(
        movie
      )})'>
        <i class="fa-regular fa-heart"></i>
      </button>
      `;
  } else {
    likeButtonHTML = `
      <button id="like-button" type="button" onclick='removeFromWishlist(${JSON.stringify(
        movie
      )})'>
        <i class="fa-solid fa-heart"></i>
      </button>
      `;
  }

  document.getElementById("like-button-area").innerHTML = likeButtonHTML;
};

// 찜하기
// 찜 버튼을 누르면 찜 표시 - 로컬스토리지에 저장
// 찜이 되어있는지 체크 - 로컬스토리지에 저장되어있는지 확인
// 찜인 상태에서 클릭 시 찜 삭제와 표시 - 로컬스토리지 삭제

// 찜 목록에 추가
const addToWishlist = (movie) => {
  // 찜한 찜한 영화 데이터 가져오기
  const wishlist = getWishlist();

  // 찜이 되어있는지 않는 경우 추가
  const liked = wishlist.some((item) => item.id === movie.id);
  if (!liked) {
    wishlist.push(movie); // 찜 목록에 추가
    console.log("찜 목록에 추가: ", wishlist);

    // 로컬스토리지에 찜 목록 문자열로 저장
    saveWishlist(wishlist);

    displayLike(movie);
  } else {
    console.log("이미 찜이 되어있습니다.");
  }
};

// 찜 삭제
const removeFromWishlist = (movie) => {
  let wishlist = getWishlist();
  wishlist = wishlist.filter((item) => item.id !== movie.id);
  saveWishlist(wishlist);

  displayLike(movie);
};
