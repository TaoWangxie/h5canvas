<template>
  <div class="container">
    <Left></Left>
    <CenterBox></CenterBox>
    <Right></Right>
  </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import Left from "./components/left/index.vue";
import CenterBox from "./components/center/index.vue";
import Right from "./components/right/index.vue";
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x: hidden;
}
</style>
