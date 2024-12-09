document.addEventListener("DOMContentLoaded", () => {
  const modalSection = document.querySelector(".modal-section");
  const closeModalButton = document.querySelector(".close-modal");
  const modalContents = document.querySelector(".modal-contents");

  const closeModal = () => {
    modalSection.classList.remove("active");
  };

  modalSection.addEventListener("click", (event) => {
    if (event.target === modalSection) {
      closeModal();
    }
  });

  closeModalButton.addEventListener("click", () => {
    closeModal();
  });

  modalContents.addEventListener("click", (event) => {
    if (event.target !== closeModalButton) {
      event.stopPropagation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
