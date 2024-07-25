// src/stores/theme.js
import { defineStore } from "pinia";
import axios from "../axios";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    themeDetails: null, // Détails d'un thème spécifique
  }),
  actions: {
    async fetchThemeDetails(themeId) {
      try {
        const response = await axios.get(`/api/themes/${themeId}`);
        this.themeDetails = response.data;
        console.log("Theme details fetched successfully:", this.themeDetails);
      } catch (error) {
        console.error(
          `Failed to fetch theme details for ID ${themeId}:`,
          error
        );
      }
    },
    async deleteTheme(themeId) {
      try {
        await axios.delete(`/api/themes/${themeId}`);
        console.log(`Theme with ID ${themeId} deleted successfully.`);
      } catch (error) {
        console.error(`Failed to delete theme with ID ${themeId}:`, error);
      }
    },
    async updateTheme(theme) {
      try {
        const response = await axios.put(`/api/themes/${theme.id}`, theme);
        this.themeDetails = response.data;
        console.log("Theme updated successfully:", this.themeDetails);
      } catch (error) {
        console.error(`Failed to update theme with ID ${theme.id}:`, error);
      }
    },
    async addTheme(theme, categoryId) {
      try {
        const response = await axios.post(`/api/themes`, theme);
        console.log("Theme added successfully:", response.data);
        return response.data; // Renvoyer les données du thème ajouté pour les utiliser si nécessaire
      } catch (error) {
        console.error("Failed to add theme:", error);
      }
    },
    async addCard(card) {
      try {
        const response = await axios.post(`/api/cards`, card);
        this.themeDetails.cards.push(response.data); // Assuming themeDetails has a cards array
        console.log("Card added successfully:", response.data);
      } catch (error) {
        console.error("Failed to add card:", error);
      }
    },
    async duplicateTheme(themeId) {
      try {
        if (typeof themeId === "object" && themeId.id) {
          themeId = themeId.id; // Extract ID from the object if passed incorrectly
        }
        const response = await axios.post(`/api/themes/${themeId}/duplicate`);
        console.log("Theme duplicated successfully:", response.data);
        return response.data; // Return the duplicated theme data if needed
      } catch (error) {
        console.error(`Failed to duplicate theme with ID ${themeId}:`, error);
      }
    },
  },
});
