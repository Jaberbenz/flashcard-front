<template>
  <div>
    <router-link :to="'/'">Dashboard</router-link>
    <h1>login</h1>
    <form @submit.prevent="login">
      <input type="email" name="email" v-model="email" />
      <input type="password" name="password" v-model="password" />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import instance from "../axios";

export default {
  data() {
    return {
      email: "imurray@example.com",
      password: "password",
    };
  },
  methods: {
    login() {
      instance
        .get(`/sanctum/csrf-cookie`)
        .then(() => {
          console.log("csrf token ok, trying to login");
          const userStore = useUserStore();
          userStore
            .login({
              email: this.email,
              password: this.password,
            })
            .then(() => {
              console.log("Connexion réussie");
              this.$router.push("/home");
            })
            .catch((err) => {
              console.log("Invalid credentials", err);
            });
        })
        .catch((error) => {
          console.log("Error while getting CSRF token", error);
        });
    },
  },
};
</script>
