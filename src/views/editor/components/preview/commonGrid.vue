<template>
  <div class="commonGrid">
    <Grid v-for="(item, index) in grids" :key="index" :grid="item"> </Grid>
  </div>
</template>
        
<script setup lang='ts'>
import _ from "lodash";
import { ref, computed, watch } from "vue";
import Grid from "./Grid.vue";
interface Props {
  grids: any;
}
const props = withDefaults(defineProps<Props>(), {
  grids: () => [],
});
</script>
        
<style lang="scss" scoped>
.commonGrid {
  position: relative;
}
</style>
        