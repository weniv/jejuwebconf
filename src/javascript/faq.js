const noticeList = document.querySelector(".faq-list");

const fetchFaqData = async () => {
  try {
    const response = await fetch("/src/data/faq.json");
    if (!response.ok) {
      throw new Error("데이터 로드 실패");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const renderNotices = (notices) => {
  notices.forEach((notice) => {
    const listItem = document.createElement("li");
    listItem.classList.add("faq-item");

    listItem.innerHTML = `
      <button type="button" class="question">
        <p>${notice.question}</p>
        <span class="arrow-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.97554 5.37593C3.20985 5.14162 3.58975 5.14162 3.82407 5.37593L8.19981 9.75167L12.5755 5.37593C12.8099 5.14162 13.1898 5.14162 13.4241 5.37593C13.6584 5.61025 13.6584 5.99014 13.4241 6.22446L8.62407 11.0245C8.38975 11.2588 8.00986 11.2588 7.77554 11.0245L2.97554 6.22446C2.74123 5.99014 2.74123 5.61025 2.97554 5.37593Z" fill="#8D9299"></path>
          </svg>
        </span>
      </button>
      <p class="answer">${notice.answer}</p>
    `;

    noticeList.appendChild(listItem);

    const button = listItem.querySelector("button");

    button.addEventListener("click", () => {
      const isActive = listItem.classList.contains("active");

      if (isActive) {
        listItem.classList.remove("active");
      } else {
        listItem.classList.add("active");
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const notices = await fetchFaqData();
  if (notices.length > 0) {
    renderNotices(notices);
  } else {
    console.error("데이터 로드 실패");
  }
});
