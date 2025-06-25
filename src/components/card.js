const cardTemplate = document.getElementById("card-template").content;

// вспомогательный селектор
const selectElement = (parent, selector) => parent.querySelector(selector);

// создаёт карточку
function createCard(
  { name, link },
  deleteCard,
  likeCard = handleLike,
  openImageCallback
) {
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;

  const cardImage = selectElement(cardElement, ".card__image");
  const cardTitle = selectElement(cardElement, ".card__title");
  const deleteButton = selectElement(cardElement, ".card__delete-button");
  const likeButton = selectElement(cardElement, ".card__like-button");

  Object.assign(cardImage, { src: link, alt: `Место: ${name}` });
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () =>
    openImageCallback?.({ name, link })
  );

  return cardElement;
}

// удаляет карточку
function deleteCard(cardElement) {
  cardElement.remove();
}

// переключает лайк
function handleLike(evt) {
  evt.currentTarget.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, handleLike };
