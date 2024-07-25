<template>
  <div v-if="isVisible" class="theme-card">
    <h3>{{ theme.name }}</h3>
    <p>{{ theme.description }}</p>
    <p><strong>Public:</strong> {{ theme.public ? "Yes" : "No" }}</p>
    <p><strong>Created by User ID:</strong> {{ theme.user_id }}</p>
    <p><strong>Belongs to Category ID:</strong> {{ theme.category_id }}</p>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { computed } from "vue";

export default {
  name: "ThemeCard",
  props: {
    theme: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    const isVisible = computed(() => {
      return props.theme.public || props.theme.user_id === userStore.user?.id;
    });

    const formattedDate = (date) => {
      return new Date(date).toLocaleString();
    };

    return {
      isVisible,
      formattedDate,
    };
  },
};
</script>

<style scoped>
.theme-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
}
h3 {
  margin-top: 0;
}
</style>
