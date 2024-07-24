<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>{{ description }}</p>
    <small v-if="createdAt">Created at: {{ formattedDate(createdAt) }}</small>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: false,
    },
  },
  methods: {
    formattedDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: "Arial", sans-serif;
}
h3 {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  color: #333;
}
p,
small {
  font-size: 1em;
}
</style>
