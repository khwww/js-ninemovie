// TODO: test용, 상세페이지 찜하기 버튼에 추가 필요
const detailRender = (movie) => {
  const detailHTML = `
      <button id="like-button" type="button" onclick="addToWishlist(${movie.id}, '${movie.title}', '${movie.image}')">
        <i class="fa-solid fa-heart"></i>
      </button>
      `;

  document.getElementById("detail").innerHTML = detailHTML;
};

const movie = {
  id: 1214502,
  image: "/hPfWHgq07nXbeldwEGxWB4JqwtE.jpg",
  title: "인 어 바이올런트 네이처",
};
detailRender(movie);

// 찜한 영화 데이터 가져오는 함수
const getWishlist = () => {
  const wishlist = localStorage.getItem("wishlist");
  console.log("로컬스토리지에서 저장된 찜한 데이터", wishlist);
  return wishlist ? JSON.parse(wishlist) : [];
};

// 찜하기
// 찜 버튼을 누르면 찜 표시 - 로컬스토리지에 저장
// 찜이 되어있는지 체크 - 로컬스토리지에 저장되어있는지 확인
// TODO: 찜인 상태에서 클릭 시 찜 삭제와 표시 - 로컬스토리지 삭제

// 찜 목록에 추가
const addToWishlist = (id, title, image) => {
  console.log(id, title, image);
  // 찜한 찜한 영화 데이터 가져오기
  const wishlist = getWishlist();

  // 찜이 되어있는지 않는 경우 추가
  const liked = wishlist.some((movie) => movie.id === id);
  if (!liked) {
    // 찜한 영화 데이터
    const movie = { id, title, image };
    console.log("찜한 영화 데이터", movie);

    wishlist.push(movie); // 찜 목록에 추가
    console.log("찜 목록에 추가: ", wishlist);

    // 로컬스토리지에 찜 목록 문자열로 저장
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    detailRender();
  } else {
    console.log("이미 찜이 되어있습니다.");
  }
};
