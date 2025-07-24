/* --------------------  Валидация форм  -------------------- */

/* показать текст ошибки */
const renderError = (form, field, message, cfg) => {
  const span = form.querySelector(`.${field.id}-error`);
  if (!span) return; // если span‑а нет – выходим тихо
  field.classList.add(cfg.inputErrorClass);
  span.textContent = message;
  span.classList.add(cfg.errorClass);
};

/* скрыть текст ошибки */
const clearError = (form, field, cfg) => {
  const span = form.querySelector(`.${field.id}-error`);
  field.classList.remove(cfg.inputErrorClass);
  if (!span) return;
  span.textContent = "";
  span.classList.remove(cfg.errorClass);
};

/* проверка конкретного поля */
const validateField = (form, field, cfg) => {
  // собственное сообщение, если не прошёл pattern
  field.setCustomValidity(
    field.validity.patternMismatch ? field.dataset.errorMessage || "" : ""
  );

  field.validity.valid
    ? clearError(form, field, cfg)
    : renderError(form, field, field.validationMessage, cfg);
};

/* есть ли ошибки среди полей формы? */
const hasErrors = (fields) => fields.some((el) => !el.validity.valid);

/* включить / выключить submit‑кнопку */
const updateSubmitState = (fields, button, cfg) => {
  const disabled = hasErrors(fields);
  button.disabled = disabled;
  button.classList.toggle(cfg.inactiveButtonClass, disabled);
};

/* назначить слушатели одной форме */
const bindValidation = (form, cfg) => {
  const fields = Array.from(form.querySelectorAll(cfg.inputSelector));
  const submit = form.querySelector(cfg.submitButtonSelector);

  updateSubmitState(fields, submit, cfg);

  fields.forEach((field) =>
    field.addEventListener("input", () => {
      validateField(form, field, cfg);
      updateSubmitState(fields, submit, cfg);
    })
  );
};

/* — экспорт: подключает валидацию ко всем формам проекта */
export const enableValidation = (cfg) =>
  Array.from(document.querySelectorAll(cfg.formSelector)).forEach((form) =>
    bindValidation(form, cfg)
  );

/* — экспорт: очищает ошибки и блокирует submit */
export const clearValidation = (form, cfg) => {
  const fields = Array.from(form.querySelectorAll(cfg.inputSelector));
  const submit = form.querySelector(cfg.submitButtonSelector);

  fields.forEach((field) => {
    clearError(form, field, cfg);
    field.setCustomValidity("");
  });

  updateSubmitState(fields, submit, cfg);
};
