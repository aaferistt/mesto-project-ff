// Работа с сервером
import {
  deleteCard as deleteCardApi,
  likeCard as putLikeApi,
  unlikeCard as removeLikeApi,
} from "./api.js";

// Шаблон и контейнер
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list"); // пригодится, если понадобится массовый рендер

/* ------------------------------------------------------------------ */
/* Лайки                                                               */
/* ------------------------------------------------------------------ */

/**
 * Обработчик клика по сердечку.
 * Tогgles лайк на сервере и обновляет счётчик.
 */
const handleLike = (evt, cardId, likeCounter) => {
  const likeBtn = evt.target;
  const isActive = likeBtn.classList.contains("card__like-button_is-active");

  // выбираем нужный API‑метод в зависимости от текущего состояния кнопки
  const apiAction = isActive ? removeLikeApi : putLikeApi;

  apiAction(cardId)
    .then(({ likes }) => {
      likeCounter.textContent = likes.length;
      likeBtn.classList.toggle("card__like-button_is-active", !isActive);
    })
    .catch((err) =>
      console.error(
        `Ошибка при ${isActive ? "удалении" : "добавлении"} лайка:`,
        err
      )
    );
};

/* ------------------------------------------------------------------ */
/* Карточка                                                            */
/* ------------------------------------------------------------------ */

/**
 * Генерация DOM‑элемента карточки.
 * @param {Object}   cardData    — данные карточки с сервера
 * @param {Function} deleteCard  — колбэк удаления (со всплывающим подтверждением)
 * @param {Function} likeCard    — колбэк лайка (обертка над handleLike)
 * @param {Function} openImage   — колбэк открытия полноразмерной картинки
 * @param {String}   userId      — id текущего пользователя
 */
function createCard(cardData, deleteCard, likeCard, openImage, userId) {
  if (!cardData) {
    console.error("createCard: cardData не передан");
    return null;
  }

  const {
    name,
    link,
    owner: { _id: ownerId } = {},
    likes = [],
    _id: cardId,
  } = cardData;

  // клонируем узел
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // кэшируем обязательные элементы
  const img = cardElement.querySelector(".card__image");
  const title = cardElement.querySelector(".card__title");
  const btnDelete = cardElement.querySelector(".card__delete-button");
  const btnLike = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".place__like-counter");

  /* -------- наполняем данными -------- */
  img.src = link;
  img.alt = `Фотография места: ${name}`;
  title.textContent = name;

  likeCounter.textContent = likes.length;

  // если среди лайков уже есть текущий пользователь — красим сердечко
  if (likes.some(({ _id }) => _id === userId)) {
    btnLike.classList.add("card__like-button_is-active");
  }

  /* -------- слушатели -------- */

  // удаление (только на своих карточках)
  if (ownerId === userId) {
    btnDelete.addEventListener("click", () => deleteCard(cardElement, cardId));
  } else {
    btnDelete.remove();
  }

  // лайк / дизлайк
  btnLike.addEventListener(
    "click",
    (evt) =>
      typeof likeCard === "function" && likeCard(evt, cardId, likeCounter)
  );

  // открытие полноразмерного изображения
  img.addEventListener("click", () => openImage(cardData));

  return cardElement;
}

/* ------------------------------------------------------------------ */
/* Удаление карточки                                                  */
/* ------------------------------------------------------------------ */

/**
 * Удаляет карточку после успешного ответа сервера.
 */
const deleteCard = (cardElement, cardId) => {
  deleteCardApi(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
};

/* ------------------------------------------------------------------ */
/* Экспорт                                                            */
/* ------------------------------------------------------------------ */

export { createCard, deleteCard, handleLike };
