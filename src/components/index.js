import {
  fetchCards,
  fetchUser,
  updateUser,
  postCard,
  updateUserAvatar,
} from "./api";
import { createCard, handleDeleteCard, handleLikeCard } from "./card";
import { closeModal, openModal } from "./modal";
import { clearValidation, enableValidation } from "./validation";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
const profileAvatar = document.querySelector(".profile__image");

const cardFormElement = document.querySelector(
  ".popup__form[name='new-place']"
);
const cardPlaceNameInput = cardFormElement.querySelector(
  ".popup__input[name='place-name']"
);
const cardPlaceLinkInput = cardFormElement.querySelector(
  ".popup__input[name='link']"
);

const profileEditAvatarPopup = document.querySelector(
  ".popup_type_edit-avatar"
);
const profileEditAvatarForm = profileEditAvatarPopup.querySelector(
  ".popup__form[name='edit-avatar']"
);
const profileEditAvatarLinkInput = profileEditAvatarForm.querySelector(
  ".popup__input[name='avatar']"
);

cardAddButton.addEventListener("click", () => {
  cardFormElement.reset();
  clearValidation(cardFormElement, validationConfig);
  openModal(cardAddPopup);
});

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileFormElement, validationConfig);
  openModal(profileEditPopup);
});

profileAvatar.addEventListener("click", () => {
  profileEditAvatarForm.reset();
  clearValidation(profileEditAvatarForm, validationConfig);
  openModal(profileEditAvatarPopup);
});

function toggleSubmitButtonState(submitButtonElement, isLoading) {
  if (isLoading) {
    submitButtonElement.textContent = "Сохранение...";
  } else {
    submitButtonElement.textContent = "Сохранить";
  }
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const name = profileNameInput.value;
  const job = profileJobInput.value;

  const submitButton = event.submitter;

  toggleSubmitButtonState(submitButton, true);

  updateUser(name, job)
    .then((user) => {
      setUserElements(user);
      closeModal(profileEditPopup);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      toggleSubmitButtonState(submitButton, false);
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(event) {
  event.preventDefault();

  const name = cardPlaceNameInput.value;
  const link = cardPlaceLinkInput.value;

  const submitButton = event.submitter;

  toggleSubmitButtonState(submitButton, true);

  postCard(name, link)
    .then((card) => {
      const newCard = createCard(
        card,
        card.owner._id,
        handleDeleteCard,
        handleLikeCard,
        previewCard
      );

      placesList.prepend(newCard);

      closeModal(cardAddPopup);
      event.target.reset();
      clearValidation(cardFormElement, validationConfig);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      toggleSubmitButtonState(submitButton, false);
    });
}

cardFormElement.addEventListener("submit", handleCardFormSubmit);

function handleProfileAvatarFormSubmit(event) {
  event.preventDefault();

  const avatarLink = profileEditAvatarLinkInput.value;

  const submitButton = event.submitter;

  toggleSubmitButtonState(submitButton, true);

  updateUserAvatar(avatarLink)
    .then((user) => {
      setUserElements(user);
      closeModal(profileEditAvatarPopup);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      toggleSubmitButtonState(submitButton, false);
    });
}

profileEditAvatarForm.addEventListener("submit", handleProfileAvatarFormSubmit);

function previewCard(event) {
  previewPopupImage.src = event.target.src;
  previewPopupImage.alt = event.target.alt;
  previewPopupCaption.textContent = event.target.alt;
  openModal(previewPopup);
}

enableValidation(validationConfig);

function setUserElements(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
}

Promise.all([fetchUser(), fetchCards()])
  .then(([user, cards]) => {
    setUserElements(user);

    cards.forEach((card) => {
      const newCard = createCard(
        card,
        user._id,
        handleDeleteCard,
        handleLikeCard,
        previewCard
      );
      placesList.append(newCard);
    });
  })
  .catch((error) => console.log(error));
