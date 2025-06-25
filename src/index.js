import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, handleLike } from "./components/card.js";
import {
  openPopup,
  closeModal,
  handleOverlayClick,
} from "./components/modal.js";

// DOM-элементы форм
const newCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];
const cardNameInput = newCardForm.elements["place-name"];
const cardLinkInput = newCardForm.elements["link"];
const nameInput = profileForm.elements["name"];
const jobInput = profileForm.elements["description"];

// Попапы
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

// Кнопки
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

// Данные профиля
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

// Контейнер карточек
const cardsContainer = document.querySelector(".places__list");

// Вспомогательные функции
function addCardToDOM(cardData, { prepend = false } = {}) {
  const element = createCard(
    cardData,
    deleteCard,
    handleLike,
    handleImageClick
  );
  prepend ? cardsContainer.prepend(element) : cardsContainer.append(element);
}

function handleImageClick({ name, link }) {
  imagePopupImage.src = link;
  imagePopupImage.alt = `Место: ${name}`;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

function openProfileEditor() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopup(popupEdit);
}

function applyPopupEnhancements() {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.classList.add("popup_is-animated");
    popup.addEventListener("click", handleOverlayClick);
  });
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Обработчики форм
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value.trim();
  profileJob.textContent = jobInput.value.trim();
  closeModal(popupEdit);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const link = cardLinkInput.value.trim();
  if (!isValidUrl(link)) return;

  addCardToDOM({ name: cardNameInput.value.trim(), link }, { prepend: true });
  newCardForm.reset();
  closeModal(popupNewCard);
}

// Навешиваем слушателей
buttonEditProfile.addEventListener("click", openProfileEditor);
buttonAddCard.addEventListener("click", () => openPopup(popupNewCard));
profileForm.addEventListener("submit", handleProfileSubmit);
newCardForm.addEventListener("submit", handleNewCardSubmit);

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach(addCardToDOM);
  applyPopupEnhancements();
});
