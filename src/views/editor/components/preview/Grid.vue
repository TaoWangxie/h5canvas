<template>
  <component
    :style="getGridStyle(grid)"
    :is="grid.comKey"
    :gridId="grid.id"
    :config="grid.config"
  >
    <template v-if="grid.children && grid.children.length">
      <Grid v-for="(item, index) in grid.children" :key="index" :grid="item" />
    </template>
  </component>
</template>
      
<script setup lang='ts'>
import _ from "lodash";
import { ref, computed, watch } from "vue";
interface Props {
  grid: any;
}
const props = withDefaults(defineProps<Props>(), {
  grid: () => [],
});

//实时赋值样式
const innerBox = ["width", "height", "top", "left"];
const getGridStyle = (grid) => {
  let { style } = grid;
  if (!style) return;
  const result = {};
  let arr = innerBox;
  arr.forEach((attr) => {
    switch (typeof style[attr]) {
      case "number":
        result[attr] = style[attr] + "px";
        break;
      case "string":
        result[attr] = style[attr];
        break;
      default:
        break;
    }
  });
  return result;
};
</script>
<style lang="scss" scoped>
</style>
      