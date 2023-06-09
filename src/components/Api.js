export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "GET",
        headers: this.headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
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
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  }

  async addNewUserInfoAvatar(link) {
    try {
      const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error);
      throw error;
    }
  }

  async getInitialCards() {
    try {
      const response = await fetch(`${this.baseUrl}/cards`, {
        method: "GET",
        headers: this.headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
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
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
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
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao excluir card:", error);
      throw error;
    }
  }

  async addLike(cardId) {
    try {
      const response = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this.headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao adicionar curtida:", error);
      throw error;
    }
  }

  async removeLike(cardId) {
    try {
      const response = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      });
      return response.ok
        ? await response.json()
        : Promise.reject(new Error(`Error: ${response.status}`));
    } catch (error) {
      console.error("Erro ao remover curtida:", error);
      throw error;
    }
  }
}
