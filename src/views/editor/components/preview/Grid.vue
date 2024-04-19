<template>
  <component
    :style="getGridStyle(grid)"
    :is="grid.comKey"
    :gridId="grid.id"
    :config="grid.config"
    @handleEvent="handleEvent"
  >
    <template v-if="grid.children && grid.children.length">
      <Grid v-for="(item, index) in grid.children" :key="index" :grid="item" />
    </template>
  </component>
</template>
      
<script setup lang='ts'>
import _ from "lodash";
import { ref, computed, inject } from "vue";
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

const eventBus:any = inject('$eBus')
const handleEvent = (data)=>{
  console.log('params:',data)
  eventBus.emit(data.type,data.data)
}
</script>
<style lang="scss" scoped>
</style>
      