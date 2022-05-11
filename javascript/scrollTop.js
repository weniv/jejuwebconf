const scrollTopBtn = document.querySelector(".scroll-top");

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