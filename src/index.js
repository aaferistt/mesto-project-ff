import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  handleImageClick,
  handleLike,
} from "./components/card.js";
import {
  openPopup,
  closeModal,
  handleEscape,
  handleOverlayClick,
} from "./components/modal.js";

const modals = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = profileForm.querySelector('[name="name"]');
const jobInput = profileForm.querySelector('[name="description"]');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const newCardPopup = document.querySelector(".popup_type_new-card");
const openCardButton = document.querySelector(".profile__add-button");
const closeCardButton = newCardPopup.querySelector(".popup__close");
const formElementCard = document.querySelector('form[name="new-place"]');
const nameInputPlace = formElementCard.querySelector('[name="place-name"]');
const linkInputPlace = formElementCard.querySelector('[name="link"]');
const placesList = document.querySelector(".places__list");

document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      handleLike,
      handleImageClick
    );
    placesList.append(cardElement);
  });
  document.querySelectorAll(".popup").forEach((popup) => {
    if (!popup.classList.contains("popup_is-animated")) {
      popup.classList.add("popup_is-animated");
    }
    popup.addEventListener("click", handleOverlayClick);
  });
});
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closeModal(popupEdit);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);
function openNewCardPopup() {
  openPopup(newCardPopup);
}
openCardButton.addEventListener("click", openNewCardPopup);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
function handleFormSubmitN(evt) {
  evt.preventDefault();
  const cardName = nameInputPlace.value;
  const cardLink = linkInputPlace.value;
  const newCardData = {
    name: cardName,
    link: cardLink,
  };
  const cardElement = createCard(
    newCardData,
    deleteCard,
    handleLike,
    handleImageClick
  );
  placesList.prepend(cardElement);
  formElementCard.reset();
  closeModal(newCardPopup);
}
formElementCard.addEventListener("submit", handleFormSubmitN);
