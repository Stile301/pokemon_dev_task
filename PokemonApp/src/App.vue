<script setup>
import { RouterView } from "vue-router";
import Header from "./components/headerNavigation.vue";
</script>
<script>
import router from "./router"; 
export default {
  data() {
    return {
      route: this.$route.name,
      page: 1
    };
  },
  methods: {
    goToPokemonList() {
      router.push(`/pokemonList/${this.page}`);
    },
  },
};
</script>

<template>
  <Header>
    <template v-slot:logo>
      <a href="/"><img src="./assets/img_poke_logo.png" alt="Pokemon logo" class="logo" /></a>
    </template>
    <template v-slot:btn v-if="$route.name === 'home'">
      <button class="btn" @click="goToPokemonList()">Pokemon list</button>
    </template>
  </Header>

  <RouterView />
</template>

<style scoped>
.logo {
  height: 56px;
  padding-inline-start: 18px;
  padding-block-start: 7px;
  padding-block-end: 12px;
}

.btn {
  border: 1px solid;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  background-color: transparent;
  padding-block: 10px;
  padding-inline: 20px;
  border-radius: 10px;
}
</style>
