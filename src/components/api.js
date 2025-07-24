/* ——— базовые настройки ——— */
const API_CFG = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-42",
  headers: {
    authorization: "eb39f821-5e8c-4b86-b78f-7efc2df98b6a",
    "Content-Type": "application/json",
  },
};

/* универсальный fetch‑обёртка */
const request = (path, opt = {}) =>
  fetch(`${API_CFG.baseUrl}${path}`, { headers: API_CFG.headers, ...opt }).then(
    (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  );

/* ——— функции, которые использует приложение ——— */
const getUserInfo = () => request("/users/me");
const getInitialCards = () => request("/cards");
const updateProfile = (name, about) =>
  request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });

const addNewCard = (name, link) =>
  request("/cards", { method: "POST", body: JSON.stringify({ name, link }) });

const deleteCard = (id) => request(`/cards/${id}`, { method: "DELETE" });
const likeCard = (id) => request(`/cards/likes/${id}`, { method: "PUT" });
const unlikeCard = (id) => request(`/cards/likes/${id}`, { method: "DELETE" });

const updateAvatar = (avatarUrl) =>
  request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar: avatarUrl }),
  });

/* ——— экспорт ——— */
export {
  getUserInfo,
  getInitialCards,
  updateProfile,
  addNewCard,
  updateAvatar,
  deleteCard,
  likeCard,
  unlikeCard,
};
