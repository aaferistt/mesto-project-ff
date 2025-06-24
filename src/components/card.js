import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(cardData, deleteCard, likeCard, openImageCallback) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteBtn = cardElement.querySelector(".card__delete-button");
  const likeBtn = cardElement.querySelector(".card__like-button");

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  titleElement.textContent = cardData.name;

  deleteBtn.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeBtn.addEventListener("click", (event) => {
    likeCard?.(event); // безопасный вызов
  });

  imageElement.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция открытия попапа с изображением
function handleImageClick(cardData) {
  const popup = document.querySelector(".popup_type_image");
  const popupImg = popup.querySelector(".popup__image");
  const caption = popup.querySelector(".popup__caption");

  popupImg.src = cardData.link;
  popupImg.alt = cardData.name;
  caption.textContent = cardData.name;

  openPopup(popup);
}

// Функция обработки лайка (экспортируется отдельно)
function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleLike, handleImageClick };
