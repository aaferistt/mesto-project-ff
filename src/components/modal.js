function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscapePress);
}

function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscapePress);
}

function onEscapePress(evt) {
  if (evt.key !== "Escape") return;

  const activePopup = document.querySelector(".popup_is-opened");
  if (activePopup) {
    closeModal(activePopup);
  }
}

function handleOverlayClick(evt) {
  const isOverlay = evt.target === evt.currentTarget;
  const isCloseBtn = evt.target.classList.contains("popup__close");

  if (isOverlay || isCloseBtn) {
    closeModal(evt.currentTarget);
  }
}

export { openPopup, closeModal, onEscapePress as handleEscape, handleOverlayClick };
