import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pokemonList/:page",
      name: "pokemonList",
      props: true,
      component: () => import("../views/PokemonList.vue"),
      children: [
        {
          path: "pokemon/:id",
          component: () => import("../views/PokemonDetails.vue"),
          props: true,
        },
      ],
    },
  ],
});

export default router;
