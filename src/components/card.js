import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// Создаёт карточку и навешивает обработчики
function createCard(cardData, deleteCard, likeCard, openImageCallback) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const image = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", (evt) => likeCard?.(evt));
  image.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

// Удаляет карточку из DOM
function deleteCard(cardElement) {
  cardElement.remove();
}

// Открывает попап с изображением
function handleImageClick(cardData) {
  const popup = document.querySelector(".popup_type_image");
  const popupImage = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openPopup(popup);
}

// Обрабатывает клик по лайку
function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleLike, handleImageClick };
