<template>
  <div class="currency-image">
    <img
      :src="image"
      alt=""
    >
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  image?: string
}>();
</script>

<style lang="scss" scoped>
.currency-image {
  display: grid;
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border: 1px solid #EBEBF3;
  border-radius: 50%;
  place-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>