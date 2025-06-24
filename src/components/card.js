import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// Создаёт карточку и навешивает обработчики
function createCard(cardData, deleteCard, likeCard, openImageCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteCard(cardElement));

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);

  image.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

// Удаляет карточку из DOM
function deleteCard(cardElement) {
  cardElement.remove();
}

// Открывает попап с изображением
function handleImageClick({ link, name }) {
  const popup = document.querySelector(".popup_type_image");

  popup.querySelector(".popup__image").src = link;
  popup.querySelector(".popup__image").alt = name;
  popup.querySelector(".popup__caption").textContent = name;

  openPopup(popup);
}

// Обрабатывает клик по лайку
function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleLike, handleImageClick };
