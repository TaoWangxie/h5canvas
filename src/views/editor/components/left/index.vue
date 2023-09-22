<template>
  <div class="left_container">
    <div class="left_content">
      <Tab :list="tabList" :tabKey="configTab" @changeTab="changeTab"></Tab>
      <Coms v-show="configTab === 'coms'"></Coms>
      <Layer v-show="configTab === 'layer'"></Layer>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import { ref } from "vue";
import { Coin, Setting } from "@element-plus/icons-vue";
import Coms from "./components/coms.vue";
import Layer from "./components/layer.vue";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

let configTab = ref("coms");

const tabList = [
  {
    key: "coms",
    icon: Setting,
  },
  {
    key: "layer",
    icon: Coin,
  },
];

const changeTab = (val: any) => {
  configTab.value = val;
};
</script>
  
<style lang="scss" scoped>
.left_container {
  width: 240px;
  height: 100%;
  z-index: 1;
  flex-shrink: 0;
}
.left_content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #e4e7ed;
}
</style>
  