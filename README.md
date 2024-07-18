9조의 팀 레포지스토리입니다.




슬라이드 이동 기능 구현

handleScroll() 동작
<ul>
<li>direction: 'left' 또는 'right' 값을 가지며, 스크롤 방향을 지정합니다.</li>
<li>listClass: 스크롤할 영화 목록의 클래스 이름입니다.</li>
<li>listElement: document.querySelector(listClass)를 사용하여 listClass에 해당하는 첫 번째 요소를 선택합니다.</li>
<li>scrollWidth: 스크롤 가능한 전체 너비에서 현재 요소의 너비를 뺀 값을 계산합니다.</li>
<li>if (direction === 'right' && scrollAmount < scrollWidth): 스크롤 방향이 오른쪽이고, 현재 스크롤 양이 최대 스크롤 너비보다 작으면, 스크롤 양을 200만큼 증가시킵니다.</li>
<li>else if (direction === 'left' && scrollAmount >= 0): 스크롤 방향이 왼쪽이고, 현재 스크롤 양이 0 이상이면, 스크롤 양을 200만큼 감소시킵니다.</li>
<li>listElement.style.transform = 'translateX(-${scrollAmount}px)';: 스크롤 양만큼 요소를 이동시킵니다.</li>
</ul>