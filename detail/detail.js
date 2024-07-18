const apiKey = "4e4f177acb805afedb5f5f64d33de73d";
const movieId = 550;

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

fetchMovieDetails();
