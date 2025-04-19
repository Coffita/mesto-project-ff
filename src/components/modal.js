let lastOpenedModal;

export function openModal(popup) {
  lastOpenedModal = popup;

  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

export function handleEscClose(event) {
  if (event.key === "Escape") {
    closeModal(lastOpenedModal);
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup__close")) {
    closeModal(event.target.closest(".popup"));
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
});
