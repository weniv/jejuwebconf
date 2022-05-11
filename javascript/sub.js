const stickerSection = document.querySelector(".sticker-section");
const closeButton = document.querySelector(".close-modal");
const recruiteTable = document.querySelector(".recruit-table-con");
const showTableButton = document.querySelector(".show-table");
const closeTableButton = document.querySelector(".close-table");
const scrollTopBtn = document.querySelector(".scroll-top");

// 스티커 나눔 모달 닫기
closeButton.addEventListener("click", () => {
    if(stickerSection.classList.contains("active")) {
        stickerSection.classList.remove("active");
    }
});

// 채용 공고 확인하기
showTableButton.addEventListener("click", () => {
    if(!recruiteTable.classList.contains("active")) {
        recruiteTable.classList.add("active");
        showTableButton.classList.add("hide");
    }
});

// 채용 공고 닫기
closeTableButton.addEventListener("click", () => {
    if(recruiteTable.classList.contains("active")) {
        recruiteTable.classList.remove("active");
        showTableButton.classList.remove("hide");
    }
});


// 스크롤 탑 버튼 이벤트
function activeScrollTopBtn() {
    const htmlScrollTop = document.querySelector("html").scrollTop;

    if(htmlScrollTop > 100) {
        scrollTopBtn.classList.add("btn-active");
    } else {
        scrollTopBtn.classList.remove("btn-active"); 
    }
}

window.addEventListener("scroll", function() {
    activeScrollTopBtn();
});

scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});