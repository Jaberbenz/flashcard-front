// src/stores/category.js
import { defineStore } from "pinia";
import axios from "../axios";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    categoryDetails: null,
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await axios.get("/api/categories");
        this.categories = response.data;
        console.log("Categories fetched successfully:", this.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
    async addCategory(category) {
      try {
        const response = await axios.post("/api/categories", category);
        this.categories.push(response.data);
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    },
    async deleteCategory(categoryId) {
      try {
        await axios.delete(`/api/categories/${categoryId}`);
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
        console.log(`Category with ID ${categoryId} deleted successfully.`);
      } catch (error) {
        console.error(
          `Failed to delete category with ID ${categoryId}:`,
          error
        );
      }
    },
    async updateCategory(category) {
      console.log("Updating category:", category);
      // try {
      const response = await axios.put(
        `/api/categories/${category.id}`,
        category
      );
      // Mettez à jour la catégorie dans l'état local
      const index = this.categories.findIndex((cat) => cat.id === category.id);
      if (index !== -1) {
        this.categories[index] = response.data;
      }
      // } catch (error) {
      //   console.error(
      //     `Failed to update category with ID ${category.id}:`,
      //     error
      //   );
      // }
    },
    async fetchCategoryDetails(categoryId) {
      try {
        const response = await axios.get(`/api/category-details/${categoryId}`);
        this.categoryDetails = response.data;
        console.log(
          "Category details fetched successfully:",
          this.categoryDetails
        );
      } catch (error) {
        console.error(
          `Failed to fetch category details for ID ${categoryId}:`,
          error
        );
      }
    },
  },
});
