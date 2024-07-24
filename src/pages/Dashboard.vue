<template>
  <router-link :to="'/login'">Login</router-link>
  <h1>Dashboard</h1>
  <p v-if="isAuthenticated">You are logged in as {{ userId }}!</p>
  <p v-else>Please log in to access this page.</p>
  <button v-if="isAuthenticated" @click="logout">Logout</button>
  <button @click="getInformations">Obtenir mes informations</button>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();

    const logout = () => {
      userStore.logout();
      // Optionnel : Redirection vers la page de login après déconnexion
      this.$router.push("/home");
    };

    return {
      isAuthenticated: userStore.isAuthenticated,
      userEmail: userStore.user?.email,
      userId: userStore.user?.id,
      logout,
    };
  },
};
</script>
