const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

function createCard(cardData, onDeleteCard) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);

  newCard.querySelector(".card__image").src = cardData.link;
  newCard.querySelector(".card__image").alt = cardData.name;
  newCard.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", onDeleteCard);

  return newCard;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

for (const cardData of initialCards) {
  placesList.append(createCard(cardData, deleteCard));
}
