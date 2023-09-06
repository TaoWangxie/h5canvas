<template>
  <div class="flex_layout" v-if="useSchema.isShowPos">
    <div
      @dragenter="dragenterPosa"
      :class="{ dragenterPosa: useSchema.isPosition === 'absolute' }"
    >
      PosA
    </div>
    <div
      @dragenter="dragenterPosr"
      :class="{ dragenterPosr: useSchema.isPosition !== 'absolute' }"
    >
      PosR
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref } from "vue";
//store管理
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

const dragenterPosa = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  useSchema.setData("isPosition", "absolute");
};
const dragenterPosr = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  useSchema.setData("isPosition", "relative");
};
</script>
<style lang="scss" scoped>
.flex_layout {
  position: absolute;
  top: 10px;
  right: 10px;
  div {
    border: 3px dashed #dcdfe6;
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    font-weight: bold;
    color: #dcdfe6;
    &:first-child {
      height: 300px;
      margin-bottom: 15px;
    }
  }
  .dragenterPosa {
    border-color: #00dd00;
    color: #00dd00;
  }
  .dragenterPosr {
    border-color: #409eff;
    color: #409eff;
  }
}
</style>
  