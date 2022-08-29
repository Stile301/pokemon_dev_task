<script>
import PokemonCard from "./pokemonCard.vue";
export default {
  data() {
    return {
      winner: localStorage.getItem("winner"),
      battleStage: false,
      phase: "start",
      pokemonData: [],
      winnerData: {},
    };
  },
  methods: {
    getRandomId(max) {
      return Math.floor(Math.random() * max);
    },
    async startBattle() {
      this.battleStage = false;
      this.pokemonData = [];
      this.phase = "battle";
      let firstPokemon;
      const firstPokemonID =
        localStorage.getItem("winner") || this.getRandomId(905);
      firstPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${firstPokemonID}/`
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      let secondPokemon = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.getRandomId(905)}/`
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      this.battleStage = true;

      this.pokemonData.push(firstPokemon);
      this.pokemonData.push(secondPokemon);
      console.log(firstPokemon.sprites.back_default)
      console.log(secondPokemon.sprites.back_default)
      await new Promise((r) => setTimeout(r, 5000));
      if (firstPokemon.weight > secondPokemon.weight) {
        localStorage.setItem("winner", firstPokemon.id);
        this.winnerData = firstPokemon;
      } else {
        localStorage.setItem("winner", secondPokemon.id);
        this.winnerData = secondPokemon;
      }
      this.phase = "battleEnded";
    },
    endBattle() {
      this.battleStage = false;
      localStorage.clear();
      this.winnerData = {};
      this.phase = "start";
    },
  },
  components: { PokemonCard },
  async mounted() {
    if (localStorage.getItem("winner")) {
      this.winnerData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem("winner")}/`
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      this.battleStage = true;
      this.phase = "battleEnded";
    }
  },
};
</script>

<template>
  <div
    v-if="!battleStage && phase === 'start'"
    class="container container-startBattle"
  >
    <img
      src="./../assets/img_poke_logo.png"
      alt="Pokemon logo"
      class="pageLogo"
    />
    <button class="btn-startBattle" @click="startBattle()">
      Start pokemon battle
    </button>
  </div>
  <div
    v-else-if="battleStage && phase === 'battle'"
    class="container container-battle"
  >
    <PokemonCard
      :pokemonName="pokemonData[0].name"
      :sprite="pokemonData[0].sprites.back_default"
    />
    <p class="vsText">vs</p>
    <PokemonCard
      :pokemonName="pokemonData[1].name"
      :sprite="pokemonData[1].sprites.back_default"
    />
  </div>
  <div
    v-else-if="battleStage && phase === 'battleEnded'"
    class="container container-endBattle"
  >
    <p class="winnerText">Winner!</p>
    <PokemonCard
      :pokemonName="winnerData.name"
      :sprite="winnerData.sprites.back_default"
    />
    <button class="btn-startBattle" @click="startBattle()">
      Start new battle
    </button>
    <button class="btn-endBattle" @click="endBattle()">End game</button>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 60px) !important;
}
.container-startBattle {
  gap: 40px;
  flex-direction: column;
  .pageLogo {
    width: 500px;
    height: 181.25px;
  }

  .btn-startBattle {
    padding: 16px;
    width: 201px;
    height: 47px;
    background: #3564ae;
    border-radius: 8px;
    @include text(15px, 700);
    align-items: center;
    text-align: center;
    color: #ffffff;
    border: unset;
  }
}

.container-battle {
  gap: 11px;
  flex-direction: row;
  .vsText {
    width: 170px;
    @include text(32px, 700);
    align-items: center;
    text-align: center;
    color: #3564ae;
  }
}
.container-endBattle {
  gap: 24px;
  flex-direction: column;
  .winnerText {
    width: 170px;
    @include text(32px, 700);
    line-height: 100%;
    align-items: center;
    text-align: center;
    color: #3564ae;
  }
  .btn-startBattle {
    padding: 16px;
    width: 201px;
    height: 47px;
    background: #3564ae;
    border-radius: 8px;
    @include text(15px, 700);
    align-items: center;
    text-align: center;
    color: #ffffff;
    border: unset;
  }
  .btn-endBattle {
    padding: 16px;
    width: 201px;
    height: 47px;
    background: transparent;
    border-radius: 8px;
    @include text(15px, 700);
    align-items: center;
    text-align: center;
    color: #3564ae;
    border: 1px solid #3564ae;
  }
}
</style>
