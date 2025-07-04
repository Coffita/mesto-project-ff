import { deleteCard, likeCard, unlikeCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  userId,
  onDeleteCard,
  onLikeCard,
  onPreviewCard
) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const newCardImage = newCard.querySelector(".card__image");
  const newCardTitle = newCard.querySelector(".card__title");
  const newCardDeleteButton = newCard.querySelector(".card__delete-button");
  const newCardLikeButton = newCard.querySelector(".card__like-button");
  const newCardLikeCounter = newCard.querySelector(".card__like-counter");

  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardTitle.textContent = cardData.name;
  newCardLikeCounter.textContent = cardData.likes.length;

  const isLikedByUser = cardData.likes.some((like) => like._id === userId);
  if (isLikedByUser) {
    newCardLikeButton.classList.add("card__like-button_is-active");
  }

  const isOwner = cardData.owner._id === userId;
  if (!isOwner) {
    newCardDeleteButton.remove();
  }

  newCardDeleteButton.addEventListener("click", () => {
    onDeleteCard(cardData._id, newCard);
  });

  newCardLikeButton.addEventListener("click", () => {
    onLikeCard(cardData._id, newCardLikeButton, newCardLikeCounter);
  });

  newCardImage.addEventListener("click", onPreviewCard);

  return newCard;
}

export function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => console.log(error));
}

export function handleLikeCard(cardId, likeButton, likeCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    unlikeCard(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((error) => console.log(error));
  } else {
    likeCard(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((error) => console.log(error));
  }
}
