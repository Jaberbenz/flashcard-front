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
          <li
            v-for="theme in categoryDetails.themes_details"
            :key="theme.theme"
          >
            <strong>{{ theme.theme }}</strong
            >: {{ theme.cards_count }} cartes
          </li>
        </ul>

        <button v-if="canDelete" @click="deleteCategory">
          Supprimer cette catégorie
        </button>
        <button v-if="canDelete" @click="startEdit">
          Modifier cette catégorie
        </button>
      </div>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "../stores/category";
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const categoryStore = useCategoryStore();
    const userStore = useUserStore();
    const categoryDetails = ref(null);
    const editing = ref(false); // État pour suivre si l'édition est en cours

    onMounted(async () => {
      const categoryId = route.params.id;
      await categoryStore.fetchCategoryDetails(categoryId);
      categoryDetails.value = categoryStore.categoryDetails;
      console.log("Category details:", categoryDetails.value);
    });

    const canDelete = computed(() => {
      return (
        categoryDetails.value &&
        categoryDetails.value.user_id === userStore.user?.id
      );
    });

    const deleteCategory = async () => {
      if (categoryDetails.value && canDelete.value) {
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
      // Optionnel: Recharger les détails de la catégorie pour annuler les changements locaux
      const categoryId = route.params.id;
      categoryStore.fetchCategoryDetails(categoryId);
      categoryDetails.value = categoryStore.categoryDetails;
    };

    const saveChanges = async () => {
      if (categoryDetails.value && canDelete.value) {
        try {
          // await categoryStore.updateCategory({
          //   id: categoryDetails.value.id,
          //   category: categoryDetails.value.category,
          //   description: categoryDetails.value.description,
          // });
          console.log("Updating category:", categoryDetails.value);
          await categoryStore.updateCategory(categoryDetails.value);
          editing.value = false;
        } catch (error) {
          console.error("Failed to update category:", error);
        }
      }
    };

    return {
      categoryDetails,
      canDelete,
      editing,
      startEdit,
      cancelEdit,
      saveChanges,
      deleteCategory,
    };
  },
};
</script>
