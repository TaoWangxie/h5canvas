<template>
  <block v-for="(item, index) in list" :key="index">
    <slot></slot>
  </block>
</template>
<script setup lang='ts'>
import { ref, watch, computed } from "vue";

let list = ref([1, 1]);
</script>
<style lang="scss" scoped>
</style>