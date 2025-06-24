import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  handleImageClick,
  handleLike,
} from "./components/card.js";
import { openPopup, closeModal, handleOverlayClick } from "./components/modal.js";

// DOM-элементы
const newCardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];

const cardNameInput = newCardForm.elements["place-name"];
const cardLinkInput = newCardForm.elements["link"];

const nameInput = profileForm.elements["name"];
const jobInput = profileForm.elements["description"];

const popupEdit = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const cardsContainer = document.querySelector(".places__list");

// Вспомогательные функции
function addCardToDOM(cardData, { prepend = false } = {}) {
  const element = createCard(cardData, deleteCard, handleLike, handleImageClick);
  prepend ? cardsContainer.prepend(element) : cardsContainer.append(element);
}

// Обработка открытия и заполнения формы профиля
function openProfileEditor() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopup(popupEdit);
}

function enablePopupAnimations() {
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

// Обработка отправки формы профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value.trim();
  profileJob.textContent = jobInput.value.trim();
  closeModal(popupEdit);
}

// Обработка отправки формы новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const link = cardLinkInput.value.trim();
  if (!isValidUrl(link)) {
    // TODO: показать сообщение об ошибке пользователю
    return;
  }

  addCardToDOM({ name: cardNameInput.value.trim(), link }, { prepend: true });
  newCardForm.reset();
  closeModal(newCardPopup);
}

// Обработка открытия формы добавления карточки
editButton.addEventListener("click", openProfileEditor);
addCardButton.addEventListener("click", () => openPopup(newCardPopup));

profileForm.addEventListener("submit", handleProfileSubmit);
newCardForm.addEventListener("submit", handleNewCardSubmit);

// Первоначальная отрисовка карточек и навешивание обработчиков
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((card) => addCardToDOM(card));
  enablePopupAnimations();
});
