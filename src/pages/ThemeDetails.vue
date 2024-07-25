<template>
  <div>
    <h1>Détails du Thème</h1>
    <div v-if="theme">
      <div v-if="editing">
        <input v-model="theme.name" placeholder="Nom du thème" />
        <input v-model="theme.description" placeholder="Description du thème" />

        <div v-if="isCreator">
          <label>
            <input type="checkbox" v-model="theme.public" /> Public
          </label>
        </div>

        <button @click="saveChanges">Enregistrer les modifications</button>
        <button @click="cancelEdit">Annuler</button>
      </div>
      <div v-else>
        <h2>{{ theme.name }}</h2>
        <p>{{ theme.description }}</p>
        <p><strong>Nombre de cartes:</strong> {{ theme.cards_count }}</p>
        <p><strong>Public:</strong> {{ theme.public ? "Oui" : "Non" }}</p>

        <h3>Cartes</h3>
        <ul>
          <Card v-for="card in theme.cards" :key="card.id" :card="card" />
        </ul>

        <button v-if="canEdit" @click="startEdit">Modifier ce thème</button>
        <button v-if="canEdit" @click="startAddingCard">
          Ajouter une carte
        </button>
        <button v-if="!canEdit" @click="duplicateTheme">
          Dupliquer ce thème
        </button>
      </div>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>

    <!-- Modal for adding a new card -->
    <div v-if="addingCard">
      <h2>Ajouter une carte</h2>
      <input v-model="newCard.front" placeholder="Texte de face avant" />
      <input v-model="newCard.back" placeholder="Texte de face arrière" />
      <button @click="addCard">Ajouter la carte</button>
      <button @click="cancelAddCard">Annuler</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useThemeStore } from "../stores/theme";
import { useUserStore } from "../stores/user";
import Card from "@/components/Card.vue";

export default {
  components: {
    Card,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const themeStore = useThemeStore();
    const userStore = useUserStore();
    const theme = ref(null);
    const editing = ref(false);
    const addingCard = ref(false); // For adding a new card
    const newCard = ref({ front: "", back: "" });

    onMounted(async () => {
      const themeId = route.params.id;
      await themeStore.fetchThemeDetails(themeId);
      theme.value = themeStore.themeDetails;
    });

    const canEdit = computed(() => {
      return theme.value && theme.value.user_id === userStore.user?.id;
    });

    const isCreator = computed(() => {
      return theme.value && theme.value.user_id === userStore.user?.id;
    });

    const startEdit = () => {
      editing.value = true;
    };

    const cancelEdit = () => {
      editing.value = false;
      const themeId = route.params.id;
      themeStore.fetchThemeDetails(themeId);
      theme.value = themeStore.themeDetails;
    };

    const saveChanges = async () => {
      if (theme.value && canEdit.value) {
        try {
          await themeStore.updateTheme(theme.value);
          editing.value = false;
        } catch (error) {
          console.error("Failed to update theme:", error);
        }
      }
    };

    const startAddingCard = () => {
      addingCard.value = true;
    };

    const cancelAddCard = () => {
      addingCard.value = false;
      newCard.value = { front: "", back: "" };
    };

    const addCard = async () => {
      if (theme.value && canEdit.value) {
        try {
          await themeStore.addCard(theme.value.id, newCard.value);
          addingCard.value = false;
          newCard.value = { front: "", back: "" };
          await themeStore.fetchThemeDetails(theme.value.id);
        } catch (error) {
          console.error("Failed to add card:", error);
        }
      }
    };

    const duplicateTheme = async () => {
      try {
        await themeStore.duplicateTheme(theme.value);
        alert("Thème dupliqué avec succès !");
        router.push("/"); // Redirect to the home or user dashboard
      } catch (error) {
        console.error("Failed to duplicate theme:", error);
      }
    };

    return {
      theme,
      canEdit,
      isCreator,
      editing,
      addingCard,
      newCard,
      startEdit,
      cancelEdit,
      saveChanges,
      startAddingCard,
      cancelAddCard,
      addCard,
      duplicateTheme,
    };
  },
};
</script>

<style scoped>
/* Ajoutez ici vos styles spécifiques à ThemeDetails.vue */
</style>
