import "../src/pages/index.css";
import { createCard, deleteCard, handleLike } from "./components/card.js";
import {
  openPopup,
  closeModal,
  handleEscape,
  handleOverlayClick,
} from "./components/modal.js";
import {
  enableValidation,
  toggleButtonState,
  clearValidation,
} from "./components/validation.js";
import {
  getUserInfo,
  checkResponse,
  getInitialCards,
  updateProfile,
  addNewCard,
  updateAvatar,
} from "./components/api.js";
import { data } from "autoprefixer";

/* ---------- DOM‑cache ---------- */
const modals              = document.querySelectorAll(".popup");
const editButton          = document.querySelector(".profile__edit-button");
const popupEdit           = document.querySelector(".popup_type_edit");
const profileForm         = document.querySelector('form[name="edit-profile"]');
const nameInput           = profileForm.querySelector('[name="name"]');
const jobInput            = profileForm.querySelector('[name="description"]');
const profileName         = document.querySelector(".profile__title");
const profileJob          = document.querySelector(".profile__description");

const newCardPopup        = document.querySelector(".popup_type_new-card");
const openCardButton      = document.querySelector(".profile__add-button");
const formElementCard     = document.querySelector('form[name="new-place"]');
const nameInputPlace      = formElementCard.querySelector('[name="place-name"]');
const linkInputPlace      = formElementCard.querySelector('[name="link"]');
const placesList          = document.querySelector(".places__list");

const popupEditAvatar     = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar      = document.querySelector('form[name="edit-avatar"]');
const avatarInput         = formEditAvatar.querySelector(".popup__input_type_avatar");
const btnOpenAvatarPopup  = document.querySelector(".profile__avatar-button");

/* ---------- validation ---------- */
const validationConfig = {
  formSelector        : ".popup__form",
  inputSelector       : ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass : "popup__button_disabled",
  inputErrorClass     : "popup__input_type_error",
  errorClass          : "popup__error_visible",
};
enableValidation(validationConfig);

/* ---------- helpers ---------- */
let userId = null;

const handleButtonState = (btn, loading) => {
  if (!btn) return;
  btn.textContent = loading ? "Сохранение..." : "Сохранить";
  btn.disabled    = loading;
  btn.classList.toggle(validationConfig.inactiveButtonClass, loading);
};

const handleImageClick = (card) => {
  const imagePopup     = document.querySelector(".popup_type_image");
  const popupImage     = imagePopup.querySelector(".popup__image");
  const popupCaption   = imagePopup.querySelector(".popup__caption");

  popupImage.src       = card.link;
  popupImage.alt       = `Фотография места: ${card.name}`;
  popupCaption.textContent = card.name;

  openPopup(imagePopup);
};

const renderCard = (data, { prepend = false } = {}) => {
  const element = createCard(
    data,
    deleteCard,
    handleLike,
    handleImageClick,
    userId
  );
  prepend ? placesList.prepend(element) : placesList.append(element);
};

/* ---------- начальная загрузка ---------- */
(async () => {
  try {
    const [cardsData, userData] = await Promise.all([
      getInitialCards(),
      getUserInfo(),
    ]);

    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent  = userData.about;
    document.querySelector(".profile__image").style.backgroundImage =
      `url(${userData.avatar})`;

    placesList.innerHTML = "";
    cardsData.forEach(renderCard);
  } catch (err) {
    console.error(`Ошибка загрузки: ${err}`);
  }
})();

/* ---------- avatar ---------- */
btnOpenAvatarPopup.addEventListener("click", () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

formEditAvatar.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const btn = evt.submitter;
  handleButtonState(btn, true);

  try {
    const userData = await updateAvatar(avatarInput.value);
    document.querySelector(".profile__image").style.backgroundImage =
      `url(${userData.avatar})`;
    closeModal(popupEditAvatar);
  } catch (err) {
    console.error("Ошибка обновления аватара:", err);
  } finally {
    handleButtonState(btn, false);
  }
});

/* ---------- profile ---------- */
editButton.addEventListener("click", () => {
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value  = profileJob.textContent;
  openPopup(popupEdit);
});

profileForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const btn = evt.submitter;
  handleButtonState(btn, true);

  try {
    await updateProfile(nameInput.value, jobInput.value);
    profileName.textContent = nameInput.value;
    profileJob.textContent  = jobInput.value;
    closeModal(popupEdit);
  } catch (err) {
    console.error("Ошибка при обновлении профиля:", err);
  } finally {
    handleButtonState(btn, false);
  }
});

/* ---------- новая карточка ---------- */
openCardButton.addEventListener("click", () => {
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig);
  openPopup(newCardPopup);
});

formElementCard.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const btn = evt.submitter;
  handleButtonState(btn, true);

  try {
    const data = await addNewCard(nameInputPlace.value, linkInputPlace.value);
    renderCard(data, { prepend: true });
    formElementCard.reset();
    closeModal(newCardPopup);
  } catch (err) {
    console.error("Ошибка при создании карточки:", err);
  } finally {
    handleButtonState(btn, false);
  }
});

/* ---------- модальные окна общие ---------- */
document.addEventListener("DOMContentLoaded", () => {
  modals.forEach((p) => {
    p.classList.add("popup_is-animated");
    p.addEventListener("click", handleOverlayClick);
  });
});
