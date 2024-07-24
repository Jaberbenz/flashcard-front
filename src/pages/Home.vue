<template>
  <div>
    <h1>Home Page</h1>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <div @click="goToCategoryDetails(category.id)">
          <CategoryCard
            :name="category.name"
            :description="category.description"
          />
        </div>
      </li>
    </ul>
    <button v-if="isAuthenticated" @click="showAddCategoryForm = true">
      Ajouter une catégorie
    </button>

    <div v-if="showAddCategoryForm" class="add-category-form">
      <h2>Ajouter une Nouvelle Catégorie</h2>
      <input v-model="newCategory.name" placeholder="Nom de la catégorie" />
      <input
        v-model="newCategory.description"
        placeholder="Description de la catégorie"
      />
      <button @click="addCategory">Valider</button>
      <button @click="cancelAddCategory">Annuler</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "../stores/category";
import CategoryCard from "@/components/CategoryCard.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user"; // Importer le store utilisateur

export default {
  components: {
    CategoryCard,
  },
  setup() {
    const categoryStore = useCategoryStore();
    const userStore = useUserStore(); // Utiliser le store utilisateur pour vérifier l'authentification
    const showAddCategoryForm = ref(false);
    const newCategory = ref({ name: "", description: "" });
    const router = useRouter();

    onMounted(() => {
      categoryStore.fetchCategories();
    });

    const goToCategoryDetails = (id) => {
      router.push({ name: "CategoryDetails", params: { id } });
    };

    const addCategory = async () => {
      try {
        await categoryStore.addCategory(newCategory.value);
        showAddCategoryForm.value = false;
        newCategory.value = { name: "", description: "" };
      } catch (error) {
        console.error("Failed to add category:", error);
      }
    };

    const cancelAddCategory = () => {
      showAddCategoryForm.value = false;
      newCategory.value = { name: "", description: "" };
    };

    return {
      categories: categoryStore.categories,
      isAuthenticated: userStore.isAuthenticated, // Vérifier si l'utilisateur est connecté
      showAddCategoryForm,
      newCategory,
      addCategory,
      cancelAddCategory,
      goToCategoryDetails,
    };
  },
};
</script>

<style scoped>
.add-category-form {
  margin-top: 20px;
}
.add-category-form input {
  display: block;
  margin: 10px 0;
}
</style>
