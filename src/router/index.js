import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import CategoryDetails from "@/pages/CategoryDetails.vue";
import ThemeDetails from "@/pages/ThemeDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/Register.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../pages/Dashboard.vue"),
    },
    {
      path: "/categories/:id",
      name: "CategoryDetails",
      component: CategoryDetails,
      props: true, // Permet de passer l'ID de la catégorie comme prop
    },
    {
      path: "/themes/:id",
      name: "ThemeDetails",
      component: ThemeDetails,
      props: true,
    },
  ],
});

export default router;
