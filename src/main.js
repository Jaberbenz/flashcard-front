import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router"; // Importez le routeur
import { useUserStore } from "./stores/user"; // Importez le store utilisateur

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const userStore = useUserStore();

// Test: Appeler fetchUser pour vérifier si les informations de l'utilisateur sont récupérées
// userStore
//   .fetchUser()
//   .then(() => {
//     console.log("User fetched successfully:", userStore.user);
//     app.mount("#app");
//   })
//   .catch((error) => {
//     console.error("Failed to fetch user information:", error);
//     // Optionnel: rediriger vers la page de login ou gérer l'erreur autrement
//     app.mount("#app");
//   });

await userStore.fetchUser();
console.log("User fetched successfully:", userStore.user);
app.mount("#app");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) =>
        console.log("Service Worker: Registered (Scope: ", reg.scope, ")")
      )
      .catch((err) =>
        console.log("Service Worker: Registration Failed: ", err)
      );
  });
}
