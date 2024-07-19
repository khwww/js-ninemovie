const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
    ".movie-list-container h1,.card-slider-section, .toggle"
);

ball.addEventListener("click", () => {
    items.forEach((item) => {
        item.classList.toggle("active");
    });
    ball.classList.toggle("active");
});

// 인기 영화 click event
const titlePopular = document.querySelector(".popular-title");
        titlePopular.addEventListener('click', () => )

//지금 상영 영화 click event
const titleNowPlaying = document.querySelector(".now-playing-title");
        titleNowPlaying.addEventListener('click', () => )

//트렌드 영화 click event
const titleTrending = document.querySelector(".trending-title");
        titleTrending.addEventListener('click', () => )

//개봉예정 영화 click event
const titleNowPlaying = document.querySelector(".upcoming-title");
titleNowPlaying.addEventListener('click', () => )

//높은평점 영화 click event
const titleTrending = document.querySelector(".topRated-title");
titleTrending.addEventListener('click', () => )

