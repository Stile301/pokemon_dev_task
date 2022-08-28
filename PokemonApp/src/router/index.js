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
