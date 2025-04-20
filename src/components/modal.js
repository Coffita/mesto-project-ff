let lastOpenedModal;

export function openModal(popup) {
  lastOpenedModal = popup;

  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("click", handleOverlayClick);
  document.addEventListener("click", handleCloseButtonClick);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
  document.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("click", handleCloseButtonClick);
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    closeModal(lastOpenedModal);
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(lastOpenedModal);
  }
}

function handleCloseButtonClick(event) {
  if (event.target.classList.contains("popup__close")) {
    closeModal(lastOpenedModal);
  }
}
