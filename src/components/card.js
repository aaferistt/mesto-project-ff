import { openPopup } from "./modal.js";

const cardTemplate = document.getElementById("card-template").content;
const $ = (root, cls) => root.querySelector(cls);

// Создаёт карточку
function createCard({ name, link }, deleteCard, likeCard = handleLike, openImageCallback = handleImageClick) {
  const root = cardTemplate.cloneNode(true).firstElementChild;

  const img     = $(root, ".card__image");
  const title   = $(root, ".card__title");
  const btnDel  = $(root, ".card__delete-button");
  const btnLike = $(root, ".card__like-button");

  Object.assign(img, { src: link, alt: `Место: ${name}` });
  title.textContent = name;

  btnDel .addEventListener("click", () => deleteCard(root));
  btnLike.addEventListener("click", likeCard);
  img    .addEventListener("click", () => openImageCallback({ name, link }));

  return root;
}

// Удаляет карточку
function deleteCard(cardElement) {
  cardElement.remove();
}

// Показывает изображение
function handleImageClick({ name, link }) {
  const popup = document.querySelector(".popup_type_image");
  const img   = popup.querySelector(".popup__image");
  const cap   = popup.querySelector(".popup__caption");

  Object.assign(img, { src: link, alt: `Место: ${name}` });
  cap.textContent = name;

  openPopup(popup);
}

// Переключает лайк
function handleLike(evt) {
  evt.currentTarget.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleLike, handleImageClick };
