import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/BattleView.vue"),
    },
    {
      path: "/pokemonList/",
      name: "pokemonList",
      component: () => import("../views/PokemonList.vue"),
    },
    {
      path: "/pokemon/:pokemonName",
      name: "pokemonDetails",
      component: () => import("../views/PokemonDetails.vue"),
      props: true,
    },
  ],
});

export default router;
