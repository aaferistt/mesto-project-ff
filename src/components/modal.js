/* Управление попапами  */

// — открыть
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscPress);
}

// — закрыть
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscPress);
}

// обработчик Esc (отдельно, чтобы ссылку передавать/снимать)
function onEscPress(evt) {
  if (evt.key !== "Escape") return;
  const active = document.querySelector(".popup_is-opened");
  active && closeModal(active);
}

// клики по крестику / оверлею
function handleOverlayClick(evt) {
  const pressedClose = evt.target.closest(".popup__close");
  if (pressedClose || evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export {
  openPopup,
  closeModal,
  onEscPress as handleEscape,
  handleOverlayClick,
};
