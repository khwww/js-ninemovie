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

// TODO: 상세페이지 찜하기 버튼에 추가 필요
const detailRender = (movie) => {
  // 찜한 찜한 영화 데이터 가져오기
  const wishlist = getWishlist();
  // 찜 여부 확인
  const liked = wishlist.some((item) => item.id === movie.id);

  // 찜 여부에 따라 표시
  let likeButtonHTML = ``;
  if (!liked) {
    likeButtonHTML = `
    ${movie.id} ${movie.title}
      <button id="like-button" type="button" onclick='addToWishlist(${JSON.stringify(
        movie
      )})'>
        <i class="fa-regular fa-heart"></i>
      </button>
      `;
  } else {
    likeButtonHTML = `
    ${movie.id} ${movie.title}
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

    detailRender(movie);
  } else {
    console.log("이미 찜이 되어있습니다.");
  }
};

// 찜 삭제
const removeFromWishlist = (movie) => {
  let wishlist = getWishlist();
  wishlist = wishlist.filter((item) => item.id !== movie.id);
  saveWishlist(wishlist);

  detailRender(movie);
};
