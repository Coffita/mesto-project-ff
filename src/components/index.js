import { createCard, deleteCard, initialCards, likeCard } from "./card";
import { closeModal, openModal } from "./modal";

const placesList = document.querySelector(".places__list");

const previewPopup = document.querySelector(".popup_type_image");
const previewPopupImage = previewPopup.querySelector(".popup__image");
const previewPopupCaption = previewPopup.querySelector(".popup__caption");

const cardAddButton = document.querySelector(".profile__add-button");
const cardAddPopup = document.querySelector(".popup_type_new-card");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");

const profileFormElement = document.querySelector(
  ".popup__form[name='edit-profile']"
);
const profileNameInput = profileFormElement.querySelector(
  ".popup__input[name='name']"
);
const profileJobInput = profileFormElement.querySelector(
  ".popup__input[name='description']"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardFormElement = document.querySelector(
  ".popup__form[name='new-place']"
);
const cardPlaceNameInput = cardFormElement.querySelector(
  ".popup__input[name='place-name']"
);
const cardPlaceLinkInput = cardFormElement.querySelector(
  ".popup__input[name='link']"
);

cardAddButton.addEventListener("click", () => {
  cardFormElement.reset();
  openModal(cardAddPopup);
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(profileEditPopup);
});

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const name = profileNameInput.value;
  const job = profileJobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal(profileEditPopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(event) {
  event.preventDefault();

  const name = cardPlaceNameInput.value;
  const link = cardPlaceLinkInput.value;

  const newCard = createCard({ name, link }, deleteCard, likeCard, previewCard);
  placesList.prepend(newCard);

  closeModal(cardAddPopup);

  event.target.reset();
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);

function previewCard(event) {
  previewPopupImage.src = event.target.src;
  previewPopupImage.alt = event.target.alt;
  previewPopupCaption.textContent = event.target.alt;
  openModal(previewPopup);
}

for (const cardData of initialCards) {
  placesList.append(createCard(cardData, deleteCard, likeCard, previewCard));
}
