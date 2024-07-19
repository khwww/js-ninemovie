const defaultCategory = "시리즈";

const categoryButton = document.querySelectorAll("#wishlist-category button");

categoryButton.forEach((button) => {
  button.addEventListener("click", categorySearch);
});

// 찜한 영화 데이터 가져오는 함수
function getWishlist() {
  const wishlist = localStorage.getItem("wishlist");
  console.log("로컬스토리지에서 저장된 찜한 데이터", JSON.parse(wishlist));
  return wishlist ? JSON.parse(wishlist) : [];
}

// 찜 리스트 렌더링
const wishlistRender = (wishlist) => {
  console.log("wishlistRender", wishlist);

  if (wishlist.length > 0) {
    const wishlistHTML = wishlist
      .map(
        (movie) => `
        <li class="wishlist-item">
          <a href="#">
            <div class="wishlist-item-img">
              <img
                class="img-fluid rounded"
                src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
                alt="${movie.title}"
              />
            </div>
            <div class="wishlist-item-info">
              <p class="wishlist-item-title">${movie.title}</p>
            </div>
          </a>
        </li>
      `
      )
      .join("");

    document.getElementById("wishlist").innerHTML = wishlistHTML;
  }
};

// 초기 로드
const initializeView = (category) => {
  const wishlist = categoryFilter(category);
  wishlistRender(wishlist);
};

initializeView(defaultCategory);

// 카테고리별 찜 리스트
function categorySearch(e) {
  categoryButton.forEach((button) => {
    button.classList.remove("active");
  });
  e.target.classList.add("active");

  const category = e.target.textContent;
  const wishlist = categoryFilter(category);

  wishlistRender(wishlist);
}

// 카테고리별 필터링
function categoryFilter(category) {
  const wishlist = getWishlist();

  let filterWishlist = [];
  // 카테고리별 데이터 나누기
  if (category === "시리즈") {
    filterWishlist = wishlist.filter(
      (movie) => movie.belongs_to_collection !== null
    );
  } else if (category === "영화") {
    filterWishlist = wishlist.filter(
      (movie) => movie.belongs_to_collection === null
    );
  }

  return filterWishlist;
}
