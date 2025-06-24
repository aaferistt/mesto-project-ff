// Открывает попап
function openPopup(popup) {
  popup.classList.toggle("popup_is-opened", true);
  document.addEventListener("keydown", escKeyHandler);
}

// Закрывает попап
function closeModal(popup) {
  popup.classList.toggle("popup_is-opened", false);
  document.removeEventListener("keydown", escKeyHandler);
}

// Закрытие по Esc
function escKeyHandler(evt) {
  if (evt.key !== "Escape") return;
  const activePopup = document.querySelector(".popup_is-opened");
  if (activePopup) closeModal(activePopup);
}

// Закрытие по клику на оверлей или крестик
function handleOverlayClick(evt) {
  const isCloseBtn = evt.target.closest(".popup__close");
  if (isCloseBtn || evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export { openPopup, closeModal, escKeyHandler as handleEscape, handleOverlayClick };
