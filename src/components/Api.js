import {
  nameOutputProfile,
  jobOutputProfile,
  imgLinkOutputAvatar,
} from "../utils/constants.js";

export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this._userInfoCache = null;
    this._currentCardsCache = null;
  }

  async getUserInfo() {
    if (this._userInfoCache) {
      return this._userInfoCache;
    }
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "GET",
        headers: this.headers,
      });
      if (response.ok) {
        const res = await response.json();
        this._userInfoCache = res;
        nameOutputProfile.textContent = res.name;
        jobOutputProfile.textContent = res.about;
        imgLinkOutputAvatar.src = res.avatar;
        return res;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      throw error;
    }
  }

  async addNewUserInfo(name, about) {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name,
          about,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        nameOutputProfile.textContent = data.name;
        jobOutputProfile.textContent = data.about;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  }

  async addNewUserInfoAvatar(link) {
    try {
      const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          ...this.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: link,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao atualizar o avatar:", error);
      throw error;
    }
  }

  async getInitialCards() {
    try {
      if (this._currentCardsCache) {
        return Promise.resolve(this._currentCardsCache);
      }

      const response = await fetch(`${this.baseUrl}/cards`, {
        method: "GET",
        headers: this.headers,
      });

      if (response.ok) {
        const cards = await response.json();
        this._currentCardsCache = cards;
        return cards;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao carregar cards:", error);
      throw error;
    }
  }

  async addNewCard(name, link) {
    try {
      const response = await fetch(`${this.baseUrl}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name,
          link,
        }),
      });
      if (response.ok) {
        const card = await response.json();
        return card;
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao criar um novo card:", error);
      throw error;
    }
  }

  async deleteCard(cardId) {
    try {
      const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      });
      if (response.ok) {
        console.log("Cartão excluído com sucesso!");
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao excluir cartão:", error);
      throw error;
    }
  }

  async addLike(cardId) {
    const response = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    });

    if (response.ok) {
      const card = await response.json();
      return card;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  }

  async removeLike(cardId) {
    const response = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });

    if (response.ok) {
      const card = await response.json();
      return card;
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  }

  async setEventListenersApi() {
    try {
      await this.getUserInfo();
    } catch (error) {
      console.error("Erro ao configurar os ouvintes da API:", error);
      throw error;
    }
  }
}
