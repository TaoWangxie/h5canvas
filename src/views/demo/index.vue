<template>
  <div class="grid">
    <loop>
      <div class="box"></div>
    </loop>
  </div>
</template>
<script setup lang='ts'>
import { ref, watch, computed } from "vue";
import loop from "./loop.vue";
</script>
<style lang="scss" scoped>
.grid {
  position: relative;
  box-sizing: border-box;
}
.box {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  margin-bottom: 10px;
}
block {
  &:last-child {
    .box {
      margin-bottom: 0;
    }
  }
}
</style>