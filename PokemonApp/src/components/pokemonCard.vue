<script>
export default {
  props: {
    pokemonName: {
      type: String,
      required: true,
    },
    sprite: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="innerCard">
      <img v-bind:src="sprite" alt="Pokemon image" />
      <p>{{ pokemonName }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/mixins.scss";

.card {
  background: #ffffff;
  box-shadow: inset -1px -1px 0px 1px #c4c4c4;
  border-radius: 16px;
  width: 305px;
  height: 360px;
  .innerCard {
    border: 2px solid #3564ae;
    border-radius: 16px;
    margin: 24px;
    img {
      width: 217px;
      height: 217px;
      margin: 18px;
    }
    p {
      width: 100%;
      @include text(16px, 700);
      align-items: center;
      text-align: center;
      color: #3564ae;
      margin: 0px 0px 34px 0px;
    }
  }
}
</style>
