// src/axios.js
import axios from "axios";

const instance = axios.create({
  // baseURL: "http://127.0.0.1:8000/api", // URL de votre backend
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
instance.defaults.withCredentials = true;
instance.defaults.withXSRFToken = true;

// Ajoute un intercepteur pour inclure le token d'authentification dans les requêtes
instance.interceptors.request.use(
  (config) => {
    // Récupère le token du Local Storage
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Ajoute le token aux en-têtes d'autorisation
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
