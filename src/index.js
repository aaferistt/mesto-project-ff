import '../src/pages/index.css';

import { createCard, deleteCard, handleLike } from './components/card.js';
import {
  openPopup,
  closeModal,
  handleOverlayClick,
} from './components/modal.js';
import {
  enableValidation,
  clearValidation,
} from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateProfile,
  addNewCard,
  updateAvatar,
} from './components/api.js';

/* --------------------  DOM‑cache  -------------------- */
const modals            = document.querySelectorAll('.popup');

const editButton        = document.querySelector('.profile__edit-button');
const popupEdit         = document.querySelector('.popup_type_edit');
const profileForm       = document.forms['edit-profile'];
const nameInput         = profileForm.elements['name'];
const jobInput          = profileForm.elements['description'];
const profileName       = document.querySelector('.profile__title');
const profileJob        = document.querySelector('.profile__description');

const newCardPopup      = document.querySelector('.popup_type_new-card');
const openCardButton    = document.querySelector('.profile__add-button');
const newCardForm       = document.forms['new-place'];
const cardNameInput     = newCardForm.elements['place-name'];
const cardLinkInput     = newCardForm.elements['link'];
const cardsContainer    = document.querySelector('.places__list');

const avatarPopup       = document.querySelector('.popup_type_edit-avatar');
const avatarForm        = document.forms['edit-avatar'];
const avatarInput       = avatarForm.elements['avatar'];
const avatarBtn         = document.querySelector('.profile__avatar-button');

/* — кэш элементов попапа‑просмотра карточки (искомое замечание ревью) */
const imagePopup        = document.querySelector('.popup_type_image');
const popupImage        = imagePopup.querySelector('.popup__image');
const popupCaption      = imagePopup.querySelector('.popup__caption');

/* -------------------- validation -------------------- */
const validationConfig = {
  formSelector        : '.popup__form',
  inputSelector       : '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass : 'popup__button_disabled',
  inputErrorClass     : 'popup__input_type_error',
  errorClass          : 'popup__error_visible',
};
enableValidation(validationConfig);

/* -------------------- helpers -------------------- */
let userId = null;

function setLoading(btn, isLoading) {
  if (!btn) return;
  btn.textContent = isLoading ? 'Сохранение…' : 'Сохранить';
  btn.disabled    = isLoading;
  btn.classList.toggle(validationConfig.inactiveButtonClass, isLoading);
}

function handleImageClick({ name, link }) {
  popupImage.src         = link;
  popupImage.alt         = `Фотография места: ${name}`;
  popupCaption.textContent = name;
  openPopup(imagePopup);
}

function addCardToDOM(cardData, { prepend = false } = {}) {
  const element = createCard(
    cardData,
    deleteCard,
    handleLike,
    handleImageClick,
    userId
  );
  prepend ? cardsContainer.prepend(element) : cardsContainer.append(element);
}

/* -------------------- initial load -------------------- */
(async () => {
  try {
    const [cards, user] = await Promise.all([getInitialCards(), getUserInfo()]);

    userId                         = user._id;
    profileName.textContent        = user.name;
    profileJob.textContent         = user.about;
    document.querySelector('.profile__image').style.backgroundImage =
      `url(${user.avatar})`;

    cardsContainer.innerHTML = '';
    cards.forEach(addCardToDOM);
  } catch (err) {
    console.error('Ошибка загрузки:', err);
  }
})();

/* -------------------- avatar -------------------- */
avatarBtn.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
});

avatarForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.submitter;
  setLoading(btn, true);

  try {
    const user = await updateAvatar(avatarInput.value);
    document.querySelector('.profile__image').style.backgroundImage =
      `url(${user.avatar})`;
    closeModal(avatarPopup);
  } catch (err) {
    console.error('Ошибка обновления аватара:', err);
  } finally {
    setLoading(btn, false);
  }
});

/* -------------------- profile -------------------- */
editButton.addEventListener('click', () => {
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value  = profileJob.textContent;
  openPopup(popupEdit);
});

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.submitter;
  setLoading(btn, true);

  try {
    await updateProfile(nameInput.value, jobInput.value);
    profileName.textContent = nameInput.value;
    profileJob.textContent  = jobInput.value;
    closeModal(popupEdit);
  } catch (err) {
    console.error('Ошибка при обновлении профиля:', err);
  } finally {
    setLoading(btn, false);
  }
});

/* -------------------- new card -------------------- */
openCardButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardPopup);
});

newCardForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.submitter;
  setLoading(btn, true);

  try {
    const card = await addNewCard(cardNameInput.value, cardLinkInput.value);
    addCardToDOM(card, { prepend: true });
    newCardForm.reset();
    closeModal(newCardPopup);
  } catch (err) {
    console.error('Ошибка при создании карточки:', err);
  } finally {
    setLoading(btn, false);
  }
});

/* -------------------- common popups -------------------- */
modals.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', handleOverlayClick);
});
