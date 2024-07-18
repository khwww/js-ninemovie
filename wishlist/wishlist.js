// 찜한 영화 데이터 가져오는 함수
const getWishlist = () => {
  const wishlist = localStorage.getItem("wishlist");
  console.log("로컬스토리지에서 저장된 찜한 데이터", JSON.parse(wishlist));
  return wishlist ? JSON.parse(wishlist) : [];
};

// 찜 리스트 렌더링
const wishlistRender = () => {
  const wishlist = getWishlist();

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

wishlistRender();
