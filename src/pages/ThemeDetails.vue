<template>
  <div>
    <h1>Détails du Thème</h1>
    <div v-if="theme">
      <h2>{{ theme.name }}</h2>
      <p>{{ theme.description }}</p>
      <p><strong>Public:</strong> {{ theme.public ? "Oui" : "Non" }}</p>
      <!-- Afficher plus d'informations si nécessaire -->
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "../stores/theme";

export default {
  setup() {
    const route = useRoute();
    const themeStore = useThemeStore();
    const theme = ref(null);

    onMounted(async () => {
      const themeId = route.params.id;
      await themeStore.fetchThemeDetails(themeId);
      theme.value = themeStore.themeDetails;
    });

    return {
      theme,
    };
  },
};
</script>
