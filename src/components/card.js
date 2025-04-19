export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, onDeleteCard, onLikeCard, onPreviewCard) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  newCard.querySelector(".card__image").src = cardData.link;
  newCard.querySelector(".card__image").alt = cardData.name;
  newCard.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", onDeleteCard);

  const likeButton = newCard.querySelector(".card__like-button");
  likeButton.addEventListener("click", onLikeCard);

  const cardImage = newCard.querySelector(".card__image");
  cardImage.addEventListener("click", onPreviewCard);

  return newCard;
}

export function deleteCard(event) {
  event.target.closest(".card").remove();
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
