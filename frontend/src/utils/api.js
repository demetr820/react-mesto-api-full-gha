import { API_OPTIONS } from "./consts";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._header = options.headers;
    this._jwt = localStorage.getItem("jwt");
    this._header.authorization = `Bearer ${this._jwt}`;
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._header }).then(
      (response) => this._checkResponse(response)
    );
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._header }).then(
      (response) => this._checkResponse(response)
    );
  }
  createCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify(item),
    }).then((response) => this._checkResponse(response));
  }
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    }).then((response) => this._checkResponse(response));
  }
  setUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify(item),
    }).then((response) => this._checkResponse(response));
  }
  setUserAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify(item),
    }).then((response) => this._checkResponse(response));
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked === true) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._header,
      }).then((response) => this._checkResponse(response));
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._header,
      }).then((response) => this._checkResponse(response));
    }
  }
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }
}

export const api = new Api(API_OPTIONS);
