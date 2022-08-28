<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="header">
    <div class="container">
      <div class="header-logo">
        <slot name="logo"> </slot>
      </div>
      <div class="header-btn">
        <slot name="btn"> </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 56px;
  border-bottom: 2px solid #2f6db5;
  .container {
    max-width: 1024px;
    margin-inline: auto;
  }
  .header-logo {
    display: inline-block;
    float: left;
    height: 54px;
  }
  .header-btn {
    display: inline-block;
    float: right;
    padding-block: 8px;
    padding-inline: 10;
  }
}
</style>
