<script>
import router from "../router";
import PokemonCard from "@/components/pokemonCard.vue";
export default {
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pokemon: {},
    };
  },
  methods: {
    async fetchNewData(text) {
      this.pokemons = await fetch(this.pokemons[text])
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
    },
    goToPokomon(name) {
      router.push(`/pokemonList/pokemon/${name}`);
    },
  },
  components: { PokemonCard },
  async mounted() {
    console.log("asasd", this.pokemonName);
    this.pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    console.log("asdasd", this.pokemon);
  },
};
</script>
<template>
  <div v-if="this.pokemon.name" class="body">
    <div class="container-name">
      <p class="back" @click="$router.go(-1)">&lt; Back</p>
      <p class="name">{{ pokemon.name }}</p>
      <p class="species">{{ pokemon.species.name }}</p>
    </div>
    <div class="twoRows">
      <PokemonCard
        :pokemonName="pokemon.name"
        :sprite="pokemon.sprites.back_default"
      />
      <div>
        <div class="container">
          <p class="abilities">Abilities</p>
          <div class="pod-container">
            <div class="pod pod--large">
              <span
                class="pod-secText listDelimiter"
                v-for="item in pokemon.abilities"
                :key="item.slot"
              >
                {{ item.ability.name }}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p class="stats">Stats</p>
          <div class="pod-container">
            <div
              class="pod pod--mini"
              v-for="item in pokemon.stats"
              :key="item.slot"
            >
              <p class="pod-primText">
                {{ item.stat.name }}
              </p>
              <p class="pod-secText">
                {{ item.base_stat }}
              </p>
              <p class="pod-secText">
                {{ item.effort }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/mixins.scss";
.container-name {
  margin-block: 32px;
  .back {
    @include text(24px, 400);
    align-items: center;
    text-align: start;
    color: #3564ae;
  }
  .name {
    @include text(32px, 400);
    align-items: center;
    text-align: start;
    color: #3564ae;
    margin-inline-start: 56px;
    margin-block: 74px 9px;
  }
  .species {
    @include text(16px, 400);
    color: #3564ae;
    margin-inline-start: 56px;
  }
}
.twoRows {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 56px;

  .abilities,
  .stats {
    @include text(16px, 600);
    align-items: center;
    text-align: start;
    color: #c4c4c4;
    margin: 8px;
  }
  .pod-container {
    max-width: 550px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    row-gap: 24px;
    .pod {
      background: #ffffff;
      border-radius: 16px;
      padding: 24px;
      :first-child{
        margin-block-end:12px;
        height: 18px;
      }
      :not(:first-child){
        margin-block:12px;
        height: 30px;
      }
      .pod-primText {
        @include text(16px, 700);
        color: #3564ae;
      }
      .pod-secText {
        @include text(16px, 400);
        color: #3564ae;
      }
      .listDelimiter:not(:last-child)::after {
        content: ", ";
      }
    }
    .pod--mini {
      width: 263px;
      height: 148px;
    }
    .pod--large {
      width: 100%;
    }
  }
}
</style>
