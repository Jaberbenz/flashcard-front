<template>
  <div>
    <router-link :to="'/login'">Login</router-link>
    <h1>Dashboard</h1>
    <p v-if="isAuthenticated">
      You are logged in as {{ userEmail }} (ID: {{ userId }})!
    </p>
    <p v-else>Please log in to access this page.</p>

    <div v-if="isAuthenticated">
      <h2>My Information</h2>
      <ul>
        <li><strong>Name:</strong> {{ userName }}</li>
        <li><strong>Email:</strong> {{ userEmail }}</li>
        <li><strong>ID:</strong> {{ userId }}</li>
        <!-- Add more information as needed -->
      </ul>
      <button @click="editMode = true">Edit Name</button>

      <div v-if="editMode">
        <h3>Edit Your Name</h3>
        <input v-model="newName" placeholder="Enter new name" />
        <button @click="saveName">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>

      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    const editMode = ref(false);
    const newName = ref("");

    const logout = () => {
      userStore.logout();
      // Optional: Redirect to login page after logout
      this.$router.push("/home");
    };

    const saveName = async () => {
      try {
        await userStore.updateUser({ name: newName.value });
        editMode.value = false;
      } catch (error) {
        console.error("Failed to update name:", error);
      }
    };

    const cancelEdit = () => {
      editMode.value = false;
      newName.value = "";
    };

    return {
      isAuthenticated: computed(() => userStore.isAuthenticated),
      userEmail: computed(() => userStore.user?.email),
      userId: computed(() => userStore.user?.id),
      userName: computed(() => userStore.user?.name),
      editMode,
      newName,
      logout,
      saveName,
      cancelEdit,
    };
  },
};
</script>
