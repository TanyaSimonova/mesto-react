class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _chekValidity(res) {
    if (res.ok) {
      return res.json();
    }
     return Promise.reject(res.status);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._chekValidity);
  }

  getItems = () => {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._chekValidity);
  }

  setUser (data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
    .then(this._chekValidity);
  }

  setUserAvatar (data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._chekValidity);
  }

  deleteCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
       authorization: this._authorization
      }
   })
    .then (this._chekValidity);
  }

  addItems(data) {
   return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then (this._chekValidity);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
       method: 'PUT',
        headers: {
          authorization: this._authorization
        }
    })
     .then (this._chekValidity);
    }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
       method: 'DELETE',
       headers: {
        authorization: this._authorization
       }
    })
     .then (this._chekValidity);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'aeec5f00-c84d-4ccf-b0d8-8816b8d86249',
    'Content-Type': 'application/json'
  }
});

export default api;