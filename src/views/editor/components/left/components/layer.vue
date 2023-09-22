<template>
  <div class="layer_box">
    <el-tree
      ref="treeRef"
      :data="useSchema.grids"
      :props="defaultProps"
      :default-expand-all="true"
      :highlight-current="true"
      :expand-on-click-node="false"
      node-key="id"
      @node-click="handleNodeClick"
    />
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import { ref, watch } from "vue";
import { Coin, Setting } from "@element-plus/icons-vue";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

const defaultProps = {
  children: "children",
  label: "comName",
};
let treeRef: any = ref(null);
watch(
  () => useSchema.currentGrid,
  (val) => {
    treeRef.value.setCurrentKey(useSchema.currentGrid.id);
  }
);

const handleNodeClick = (val) => {
  console.log(val);
  useSchema.setData("currentGrid", val);
  useSchema.setData("isPosition", val.config.data.position);
};
</script>
  
<style lang="scss" scoped>
.layer_box {
}
</style>
  