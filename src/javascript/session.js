const sessionSection = document.querySelector(".session-section");
const buttonList = document.querySelector(".session-button-list");

const fetchSessionData = async () => {
  try {
    const response = await fetch("/src/data/session.json");
    if (!response.ok) {
      throw new Error("데이터 로드 실패");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const renderSessions = (day, sessions) => {
  const sessionListContainer = document.querySelector(
    ".session-list-container"
  );

  if (sessionListContainer) {
    sessionListContainer.remove();
  }

  const newSessionListContainer = document.createElement("article");
  newSessionListContainer.classList.add("session-list-container");

  const dateHeading = document.createElement("h3");
  dateHeading.classList.add("session-date");
  dateHeading.textContent = sessions[day].data;
  newSessionListContainer.appendChild(dateHeading);

  const sessionList = document.createElement("ul");
  sessionList.classList.add("session-list");

  sessions[day].session.forEach((session) => {
    const sessionCard = document.createElement("li");
    sessionCard.classList.add("session-card");

    switch (session.type) {
      case "session":
        sessionCard.innerHTML = `
			<header class="session-header">
				<p class="session-time">${session.time}</p>
				<p>장소</p>
			</header>
			<section class="session-content">
				<div class="content">
					<img
					class="session-image"
					src="${session.profile_image}"
					alt="${session.alt_text}"
					/>
					<div class="session-info">
						<h4 class="session-title">${session.title}</h4>
						<p class="session-speaker">
							<strong>${session.speaker}</strong>
							<span class="speaker-company">${session.company}</span>
						</p>
					</div>
				</div>
				<p class="session-location">${session.location}</p>
			</section>
		`;
        break;
      case "notice":
        sessionCard.innerHTML = `
		  <header class="session-header">
			<p class="session-time">${session.time}</p>
			<p>장소</p>
		  </header>
		  <section class="session-content">
			<p class="content notice">${session.title}</p>
			<p class="session-location">${session.location}</p>
		  </section>
		`;
        break;
      default:
        break;
    }

    sessionList.appendChild(sessionCard);
  });

  newSessionListContainer.appendChild(sessionList);
  sessionSection.appendChild(newSessionListContainer);
};

const updateActiveButton = (activeButton) => {
  const buttons = document.querySelectorAll(".session-button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
};

buttonList.addEventListener("click", async (event) => {
  const button = event.target;
  if (button.tagName === "BUTTON") {
    const day = button.getAttribute("data-day");

    // JSON 데이터 가져오기
    const sessions = await fetchSessionData();
    if (sessions) {
      renderSessions(day, sessions);
      updateActiveButton(button);
    } else {
      console.error("데이터 로드 실패");
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const sessions = await fetchSessionData();
  if (sessions) {
    const defaultButton = document.querySelector(
      '.session-button[data-day="day1"]'
    );
    renderSessions("day1", sessions);
    updateActiveButton(defaultButton);
  } else {
    console.error("데이터 로드 실패");
  }
});
