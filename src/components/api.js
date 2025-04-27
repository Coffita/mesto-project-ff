const TOKEN = "29ba2543-be42-4068-a9ab-451584072e2d";
const COHORT_ID = "wff-cohort-36";
const API_URL = `https://nomoreparties.co/v1/${COHORT_ID}`;
const HEADERS = {
  Authorization: TOKEN,
  "Content-Type": "application/json",
};

export function request(url, options) {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function fetchUser() {
  return request(`${API_URL}/users/me`, {
    method: "GET",
    headers: HEADERS,
  });
}

export function updateUser(name, about) {
  return request(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

export function updateUserAvatar(avatar) {
  return request(`${API_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({
      avatar,
    }),
  });
}

export function fetchCards() {
  return request(`${API_URL}/cards`, {
    method: "GET",
    headers: HEADERS,
  });
}

export function postCard(name, link) {
  return request(`${API_URL}/cards`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      name,
      link,
    }),
  });
}

export function deleteCard(cardId) {
  return request(`${API_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: HEADERS,
  });
}

export function likeCard(cardId) {
  return request(`${API_URL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: HEADERS,
  });
}

export function unlikeCard(cardId) {
  return request(`${API_URL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: HEADERS,
  });
}
