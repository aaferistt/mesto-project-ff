// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Функция создания карточки
function createCard(cardData, handleDelete) {
  // Клонируем шаблон
  const cardElement = cardTemplate.cloneNode(true);

  // Элементы внутри карточки
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Устанавливаем содержимое
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Обработчик удаления
  deleteButton.addEventListener('click', () => {
    handleDelete(cardElement);
  });

  // Возвращаем DOM-элемент карточки
  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, handleDeleteCard);
  cardsContainer.appendChild(card);
});
