// src/stores/user.js
import { defineStore } from "pinia";
import axios from "../axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: localStorage.getItem("auth_token") || null,
  }),
  actions: {
    async login(credentials) {
      const response = await axios.post("/api/login", credentials);
      this.user = response.data.user;
      this.token = response.data.token;
      localStorage.setItem("auth_token", this.token);
    },
    async register(userData) {
      try {
        const response = await axios.post("/api/register", userData);
        this.user = response.data.user;
        this.token = response.data.access_token;
        localStorage.setItem("auth_token", this.token);
      } catch (error) {
        throw new Error("Registration failed");
      }
    },
    async fetchUser() {
      if (this.token) {
        try {
          console.log("fetching user");
          const response = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.user = response.data;
        } catch (error) {
          this.logout();
        }
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("auth_token");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userEmail: (state) => (state.user ? state.user.email : null),
  },
});
