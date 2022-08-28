<script>
import PokemonCard from "@/components/pokemonCard.vue";
export default {
  data() {
    return {
      pokemons: {},
    };
  },
  computed: {
    hasNext() {
      return !!this.pokemons.next;
    },
    hasPrevious() {
      return !!this.pokemons.previous;
    },
    pageNumber() {
      if (this.hasNext) {
        const url = new URL(this?.pokemons?.next);
        const values = url.search.split("&");
        return values[0].replace(/\D/g, "") / values[1].replace(/\D/g, "");
      } else if (this.hasPrevious) {
        const url = new URL(this?.pokemons?.previous);
        const values = url.search.split("&");
        return values[0].replace(/\D/g, "") / values[1].replace(/\D/g, "");
      }
      return 1;
    },
  },
  methods: {
    async fetchNewData(text) {
      this.pokemons = await fetch(this.pokemons[text])
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    },
  },
  components: { PokemonCard },
  async mounted() {
    this.pokemons = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=12&offset=0`
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  },
};
</script>
<template>
  <div class="list">
    <PokemonCard
      v-for="item in pokemons.results"
      :key="item.name"
      :pokemonName="item.name"
      :sprite="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${item.url
        .split('/')
        .at(-2)}.png`"
    />
    <div class="navigation-row">
      <button
        @click="fetchNewData('previous')"
        class="navigation-btn"
        :class="hasPrevious ? '' : 'navigation-disabled'"
      >
        &lt;
      </button>
      <p class="navigation-page">{{ pageNumber }}</p>
      <button
        @click="fetchNewData('next')"
        class="navigation-btn"
        :class="hasNext ? '' : 'navigation-disabled'"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  width: 100%;
  max-width: 1024px;
  margin-inline: auto;
  margin-block: 20px 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;
  .navigation-row {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 40px;
    .navigation-btn {
      border: 2px solid #3564ae;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      color: #3564ae;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 100%;
      align-items: center;
      text-align: center;
      color: #3564ae;
    }
    .navigation-page {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 100%;
      align-items: center;
      text-align: center;
      color: #3564ae;
    }
    .navigation-disabled {
      border: 2px solid #a0a0a0;
      color: #a0a0a0;
      pointer-events: none;
    }
  }
}
</style>
