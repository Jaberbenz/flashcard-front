<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import instance from "../axios";

export default {
  data() {
    return {
      name: "jaber",
      email: "jaber@zez.com",
      password: "password",
    };
  },
  methods: {
    register() {
      instance
        .get(`/sanctum/csrf-cookie`)
        .then(() => {
          console.log("csrf token ok, trying to register");
          const userStore = useUserStore();
          userStore
            .register({
              name: this.name,
              email: this.email,
              password: this.password,
            })
            .then(() => {
              console.log("Registration successful");
              this.$router.push("/home");
            })
            .catch((err) => {
              console.error("Registration failed", err);
            });
        })
        .catch((error) => {
          console.error("Error while getting csrf token", error);
        });
    },
  },
};
</script>
