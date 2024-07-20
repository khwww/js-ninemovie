let category = "시리즈";
let isEditMode = false;
let isAllSelected = false;
let selectedListId = [];
let selectedMoviesCount = 0;

const categoryButtons = document.querySelectorAll("#wishlist-category button");
const editButton = document.getElementById("wishlist-edit-button");
const editInner = document.getElementById("wishlist-edit-inner");
const selectAllButton = document.getElementById("select-all-button");
const deleteButton = document.getElementById("wishlist-delete-button");
const completeButton = document.getElementById("wishlist-complete-button");

// 카테고리 버튼들
categoryButtons.forEach((button) => {
  button.addEventListener("click", categorySearch);
});

// 편집 버튼
editButton.addEventListener("click", editMode);

// 전체선택
selectAllButton.addEventListener("click", selectAllWishlist);

// 삭제 버튼
deleteButton.addEventListener("click", removeFromWishlist);

// 완료 버튼
completeButton.addEventListener("click", completeEditMode);

// a 태그의 기본 동작을 막기
function preventLink(event) {
  event.preventDefault();
}

// 찜한 영화 데이터 가져오기
const getWishlist = () => {
  const wishlist = localStorage.getItem("wishlist");
  console.log("로컬스토리지에서 저장된 찜한 데이터", JSON.parse(wishlist));
  return wishlist ? JSON.parse(wishlist) : [];
};

// 로컬스토리지에 찜 목록 저장
const saveWishlist = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

// 찜 리스트 렌더링
const wishlistRender = (wishlist, category) => {
  console.log("wishlistRender", wishlist);

  if (wishlist.length > 0) {
    const wishlistHTML = wishlist
      .map(
        (movie) => `
        <li id="${movie.id}" class="wishlist-item" onclick="selectWishlist(event, ${movie.id})">
          <a href="../detail/detail.html">
            <div class="wishlist-item-thumbnail">
              <div class="wishlist-item-img">
                <img
                  class="img-fluid rounded"
                  src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
                  alt="${movie.title}"
                />
              </div>
              <div id="wishlist-edit-mode">
                <button id="wishlist-checkbox"><i class="fa-solid fa-check"></i></button>
              </div>
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
    document.getElementById("emptyWishlist").style.display = "none";
  } else {
    document.getElementById("wishlist").innerHTML = "";
    document.getElementById("emptyWishlist").style.display = "flex";
    document.getElementById(
      "emptyWishlist-content"
    ).textContent = `찜한 ${category}가 없습니다.`;
  }
};

// 초기 로드
const initializeView = (category) => {
  console.log(category);
  const wishlist = categoryFilter(category);
  wishlistRender(wishlist, category);
};

initializeView(category);

// 카테고리별 찜 리스트
function categorySearch(event) {
  categoryButtons.forEach((button) => {
    button.classList.remove("active");
  });
  event.target.classList.add("active");

  category = event.target.textContent;
  const wishlist = categoryFilter(category);

  wishlistRender(wishlist, category);
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

// 편집 모드
function editMode() {
  isEditMode = true;

  this.style.display = "none";
  editInner.style.display = "flex";

  const wishlistItems = document.querySelectorAll("#wishlist .wishlist-item");
  wishlistItems.forEach((item) => {
    // a 태그의 기본 동작을 막기 위해 이벤트 리스너 추가
    item.querySelector("a").addEventListener("click", preventLink, true);
    item.querySelector("#wishlist-edit-mode").style.display = "block";
  });
}

// 전체 선택 / 해제하기
function selectAllWishlist(event) {
  const wishlistItems = document.querySelectorAll(".wishlist-item");

  // 전체 선택 여부
  isAllSelected = Array.from(wishlistItems).every((item) =>
    item.querySelector("#wishlist-checkbox").classList.contains("selected")
  );

  if (!isAllSelected) {
    event.target.textContent = "전체해제";

    wishlistItems.forEach((item) => {
      const movieId = parseInt(item.id);
      const checkbox = item.querySelector("#wishlist-checkbox");

      if (!checkbox.classList.contains("selected")) {
        checkbox.classList.add("selected");

        selectedListId.push(movieId);
        console.log(selectedListId);
        selectedMoviesCount++;
      }
    });

    deleteButton.textContent = `삭제(${selectedMoviesCount})`;
  } else {
    event.target.textContent = "전체선택";

    wishlistItems.forEach((item) => {
      item.querySelector("#wishlist-checkbox").classList.remove("selected");
    });

    selectedListId = [];
    console.log(selectedListId);
    selectedMoviesCount = 0;
    deleteButton.textContent = `삭제(${selectedMoviesCount})`;
  }
}

// 찜 리스트 선택하기
const selectWishlist = (event, movieId) => {
  if (isEditMode === true) {
    console.log(event.target);
    const checkbox = event.target.querySelector("#wishlist-checkbox");

    if (!checkbox.classList.contains("selected")) {
      event.target
        .querySelector("#wishlist-checkbox")
        .classList.add("selected");

      selectedListId.push(movieId);
      console.log(selectedListId);

      selectedMoviesCount++;
      deleteButton.textContent = `삭제(${selectedMoviesCount})`;
    } else {
      event.target
        .querySelector("#wishlist-checkbox")
        .classList.remove("selected");

      selectedListId = selectedListId.filter((num) => num !== movieId);
      console.log(selectedListId);

      selectedMoviesCount--;
      deleteButton.textContent = `삭제(${selectedMoviesCount})`;
    }

    // 전체 선택 상태 업데이트
    const wishlistItems = document.querySelectorAll("#wishlist .wishlist-item");
    isAllSelected = Array.from(wishlistItems).every((item) =>
      item.querySelector("#wishlist-checkbox").classList.contains("selected")
    );
    if (isAllSelected) {
      selectAllButton.textContent = "전체해제";
    } else {
      selectAllButton.textContent = "전체선택";
    }
  }
};

// 찜 삭제
function removeFromWishlist() {
  const wishlist = getWishlist();

  const newWishlist = wishlist.filter(
    (item) => !selectedListId.includes(item.id)
  );

  saveWishlist(newWishlist); // 로컬스토리지 저장
  console.log(newWishlist);

  completeEditMode();
  initializeView(category); // UI반영
}

// 편집 모드 완료
function completeEditMode() {
  isEditMode = false;
  isAllSelected = false;
  selectedListId = [];
  selectedMoviesCount = 0;

  selectAllButton.textContent = "전체선택";
  deleteButton.textContent = `삭제(${selectedMoviesCount})`;

  editInner.style.display = "none";
  editButton.style.display = "block";

  const wishlistItems = document.querySelectorAll("#wishlist .wishlist-item");
  wishlistItems.forEach((item) => {
    item.querySelector("a").removeEventListener("click", preventLink, true);
    item.querySelector("#wishlist-checkbox").classList.remove("selected");
    item.querySelector("#wishlist-edit-mode").style.display = "none";
  });
}
