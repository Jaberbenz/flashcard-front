<template>
  <div>
    <h1>Détails de la Catégorie</h1>
    <div v-if="categoryDetails">
      <div v-if="editing">
        <input
          v-model="categoryDetails.category"
          placeholder="Nom de la catégorie"
        />
        <input
          v-model="categoryDetails.description"
          placeholder="Description de la catégorie"
        />
        <button @click="saveChanges">Enregistrer les modifications</button>
        <button @click="cancelEdit">Annuler</button>
      </div>
      <div v-else>
        <h2>{{ categoryDetails.category }}</h2>
        <p>{{ categoryDetails.description }}</p>
        <p>Nombre de thèmes : {{ categoryDetails.themes_count }}</p>
        <h3>Thèmes</h3>
        <ul>
          <li v-for="theme in categoryDetails.themes_details" :key="theme.id">
            <div @click="goToThemeDetails(theme.id)">
              <ThemeCard :theme="theme" />
            </div>
          </li>
        </ul>

        <button v-if="canEdit" @click="deleteCategory">
          Supprimer cette catégorie
        </button>
        <button v-if="canEdit" @click="startEdit">
          Modifier cette catégorie
        </button>
      </div>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>

    <!-- Formulaire pour ajouter un nouveau thème -->
    <div v-if="isAuthenticated && addingTheme">
      <h3>Ajouter un nouveau thème</h3>
      <input v-model="newTheme.name" placeholder="Nom du thème" />
      <input v-model="newTheme.description" placeholder="Description" />
      <label>
        <input type="radio" v-model="newTheme.public" :value="true" /> Public
      </label>
      <label>
        <input type="radio" v-model="newTheme.public" :value="false" /> Privé
      </label>
      <button @click="addTheme">Ajouter</button>
      <button @click="cancelAddTheme">Annuler</button>
    </div>

    <button v-if="isAuthenticated && !addingTheme" @click="startAddTheme">
      Ajouter un thème
    </button>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "../stores/category";
import { useUserStore } from "../stores/user";
import { useThemeStore } from "../stores/theme";
import ThemeCard from "@/components/ThemeCard.vue"; // Assurez-vous que ce chemin est correct

export default {
  components: {
    ThemeCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const categoryStore = useCategoryStore();
    const userStore = useUserStore();
    const themeStore = useThemeStore();
    const categoryDetails = ref(null);
    const editing = ref(false); // État pour suivre si l'édition est en cours
    const addingTheme = ref(false); // État pour suivre si l'ajout d'un thème est en cours
    const newTheme = ref({
      name: "",
      description: "",
      public: true,
    });

    onMounted(async () => {
      const categoryId = route.params.id;
      await categoryStore.fetchCategoryDetails(categoryId);
      categoryDetails.value = categoryStore.categoryDetails;
    });

    const isAuthenticated = computed(() => userStore.isAuthenticated);

    const canEdit = computed(() => {
      return (
        categoryDetails.value &&
        categoryDetails.value.user_id === userStore.user?.id
      );
    });

    const deleteCategory = async () => {
      if (categoryDetails.value && canEdit.value) {
        try {
          await categoryStore.deleteCategory(categoryDetails.value.id);
          router.push("/"); // Redirige vers la page d'accueil après suppression
        } catch (error) {
          console.error("Failed to delete category:", error);
        }
      }
    };

    const startEdit = () => {
      editing.value = true;
    };

    const cancelEdit = () => {
      editing.value = false;
      const categoryId = route.params.id;
      categoryStore.fetchCategoryDetails(categoryId);
      categoryDetails.value = categoryStore.categoryDetails;
    };

    const saveChanges = async () => {
      if (categoryDetails.value && canEdit.value) {
        try {
          await categoryStore.updateCategory(categoryDetails.value);
          editing.value = false;
        } catch (error) {
          console.error("Failed to update category:", error);
        }
      }
    };

    const startAddTheme = () => {
      addingTheme.value = true;
    };

    const cancelAddTheme = () => {
      addingTheme.value = false;
      newTheme.value = { name: "", description: "", public: true };
    };

    const addTheme = async () => {
      if (categoryDetails.value && isAuthenticated.value) {
        try {
          const themeData = {
            ...newTheme.value,
            user_id: userStore.user.id, // Utilisateur connecté
            category_id: categoryDetails.value.id,
          };
          await themeStore.addTheme(themeData);
          addingTheme.value = false;
          newTheme.value = { name: "", description: "", public: true };
          categoryStore.fetchCategoryDetails(route.params.id); // Recharger les détails de la catégorie
        } catch (error) {
          console.error("Failed to add theme:", error);
        }
      }
    };

    const goToThemeDetails = (themeId) => {
      router.push({ name: "ThemeDetails", params: { id: themeId } });
    };

    return {
      categoryDetails,
      isAuthenticated,
      canEdit,
      editing,
      addingTheme,
      newTheme,
      startEdit,
      cancelEdit,
      saveChanges,
      deleteCategory,
      startAddTheme,
      cancelAddTheme,
      addTheme,
      goToThemeDetails,
    };
  },
};
</script>
