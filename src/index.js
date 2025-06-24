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

// DOM-элементы
const profileForm = document.forms["edit-profile"];
const formElementCard = document.forms["new-place"];
const nameInput = profileForm.elements["name"];
const jobInput = profileForm.elements["description"];
const nameInputPlace = formElementCard.elements["place-name"];
const linkInputPlace = formElementCard.elements["link"];

const popupEdit = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const openCardButton = document.querySelector(".profile__add-button");

// Обработка открытия и заполнения формы профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

// Обработка открытия формы добавления карточки
openCardButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

// Обработка отправки формы профиля
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
});

// Обработка отправки формы новой карточки
formElementCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: nameInputPlace.value,
    link: linkInputPlace.value,
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
});

// Первоначальная отрисовка карточек и навешивание обработчиков
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
    popup.classList.add("popup_is-animated");
    popup.addEventListener("click", handleOverlayClick);
  });
});